/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/config/env';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string | number | boolean | undefined | null>;
};

let authToken: string | null = null;
console.log(authToken)

export function setAuthToken(token: string | null) {
    authToken = token;
    if (typeof window !== 'undefined') {
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }
}

function buildUrlWithParams(url: string, params?: RequestOptions['params']): string {
    if (!params) return url;

    const filteredParamsArray = Object.entries(params).filter(
        ([, value]) => value !== undefined && value !== null
    )
    const filteredParams = Object.fromEntries(filteredParamsArray);
    if (Object.keys(filteredParams).length === 0) return url;

    const queryString = new URLSearchParams(
        filteredParams as Record<string, string>)
        .toString();

    return `${url}?${queryString}`;
}

async function fetchApi<T>(url: string, options: RequestOptions = {}): Promise<T> {
    const { method = 'GET', headers, body, params } = options;
    const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

    const isFormData = body instanceof FormData;
    const finalHeaders = {
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
        ...headers,
    };

    const response = await fetch(fullUrl, {
        method,
        headers: finalHeaders,
        body: isFormData ? body : body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        const errorMessage = (await response.json()).detail || response.statusText;
        throw new Error(`Error ${response.status}: ${errorMessage}`);
    }

    return response.json()
}

export const api = {
    get<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' });
    },
    post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'POST', body });
    },
    put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'PUT', body });
    },
    delete<T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'DELETE' });
    },
}
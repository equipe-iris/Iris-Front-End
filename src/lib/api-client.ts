/* eslint-disable @typescript-eslint/no-explicit-any */
import { env } from '@/config/env';

type RequestOptions = {
    method?: string;
    headers?: Record<string, string>;
    body?: any;
    params?: Record<string, string | number | boolean | undefined | null>;
};

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

    const response = await fetch(fullUrl, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
        const errorMessage = (await response.json()).detail || response.statusText;
        throw new Error(`Error ${response.status}: ${errorMessage}`);	
    }

    return response.json()
}

export const api = {
    get <T>(url: string, options?: RequestOptions): Promise<T> {
        return fetchApi<T>(url, { ...options, method: 'GET' });
    }
}
import { z } from 'zod';
// import 'dotenv/config';

function createEnv() {
    const EnvSchema = z.object({
        API_URL: z.string()
    })

    const envVars = {
        API_URL: process.env.NEXT_PUBLIC_API_URL
    }

    const parsedEnv = EnvSchema.safeParse(envVars)
    
    if (!parsedEnv.success) {
        throw new Error(`Invalid environment variables:\n${parsedEnv.error.format()}`)
    }

    return parsedEnv.data ?? {}
}

export const env = createEnv()
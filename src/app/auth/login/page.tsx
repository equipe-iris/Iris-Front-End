import Image from "next/image";

import { LoginForm } from "@/features/auth/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Íris - Login"
}

export default function LoginPage() {
    return (
        <div className="w-full min-h-screen flex p-4 lg:p-0">
            <div className="hidden lg:block relative w-[40%] max-w-[720px] min-w-[500px] h-screen">
                <Image 
                    src={"/login-page.jpg"} 
                    alt="sei lá" 
                    fill
                    sizes="40vw"
                    priority
                    className="object-cover"
                />
            </div>
            <LoginForm />
        </div>
    )
}
"use client";

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateUserSchema, UpdateUserSchema, useUpdateUser } from "../api/update-user"
import { User } from "./users-table-columns"

import { useAuth } from "@/hooks/use-auth";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "sonner";
import { Loader2 } from "lucide-react"

interface UpdateUserFormProps {
    user?: User
    isDisabled?: boolean
}

export function UpdateUserForm({ user, isDisabled }: UpdateUserFormProps) {

    const { user: currentUser } = useAuth()
    const sameUser = currentUser?.id === user?.id

    const form = useForm<UpdateUserSchema>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            ...user,
            password: "",
        }
    })

    const updateUserMutation = useUpdateUser({
        mutationConfig: {
            onSuccess: () => {
                toast.success("Usuário atualizado com sucesso.")
            },
            onError: (error) => {
                toast.error(`Não foi possível atualizar o usuário: ${error}`)
                console.log(error)
            }
        }
    })

    const isPending = updateUserMutation.isPending

    function onSubmit(data: UpdateUserSchema) {
        console.log(data)
        updateUserMutation.mutate(data)
    }

    if (!user) {
        return (
            <div className="w-full h-72 flex flex-col gap-3 justify-center p-5 text-zinc-700 font-medium text-center">
                <p>Não foi possível recuperar os dados do usuário</p>
                <p>Tente novamente mais tarde</p>
            </div>
        )
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5 py-4"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome completo</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isDisabled} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} disabled={isDisabled} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {sameUser && (
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input {...field} disabled={isDisabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Perfil</FormLabel>
                            <FormControl>
                                <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    disabled={isDisabled || sameUser}
                                >
                                    <SelectTrigger className="w-[180px] bg-white">
                                        <SelectValue placeholder="Selecione um perfil" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="Viewer">VIEWER</SelectItem>
                                            <SelectItem value="Admin">ADMIN</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {!isDisabled && (
                    <Button
                        type="submit"
                        className="mt-4"
                    >
                        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
                        Atualizar
                    </Button>
                )}
            </form>
        </Form>
    )
}
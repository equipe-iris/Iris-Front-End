"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";

import { PlusCircle } from "lucide-react";
import { CreateUserForm } from "./create-user-form";

export function UsersListHeader() {
    return (
        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-medium text-zinc-800">Usuários</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <PlusCircle size={16} />
                        Cadastrar
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Cadastrar novo usuário</DialogTitle>
                    </DialogHeader>
                    <CreateUserForm />
                </DialogContent>
            </Dialog>
        </div>
    )
}
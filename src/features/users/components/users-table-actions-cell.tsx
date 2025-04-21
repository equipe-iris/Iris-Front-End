import React from "react";
import { User } from "./users-table-columns"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Pencil, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { UpdateUserForm } from "./update-user-form";

interface UsersTableActionsCellProps {
    user: User
}

export default function UsersTableActionsCell({ user }: UsersTableActionsCellProps) {
    const [openView, setOpenView] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-center">
                        <EllipsisVertical className="cursor-pointer text-muted-foreground hover:text-zinc-800" size={16} />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem
                        onClick={() => setOpenView(true)}
                        className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer"
                    >
                        <Eye size={16} className="text-sm font-semibold text-zinc-700" />
                        Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => setOpenEdit(true)}
                        className="flex items-center gap-2 text-sm font-medium text-zinc-700 cursor-pointer"
                    >
                        <Pencil size={16} className="text-sm font-semibold text-zinc-700" />
                        Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => { }}
                        className="flex items-center gap-2 text-sm font-medium text-red-500 cursor-pointer hover:text-red-500"
                    >
                        <Trash2 size={16} className="text-sm font-semibold text-red-500" />
                        Excluir
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* Dialogs das actions */}

            <Dialog open={openView} onOpenChange={setOpenView}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Visualizar usuário</DialogTitle>
                        <DialogDescription hidden>Visualizar os dados atuais de um usuário</DialogDescription>
                    </DialogHeader>
                    <UpdateUserForm user={user} isDisabled />
                </DialogContent>
            </Dialog>

            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Editar usuário</DialogTitle>
                        <DialogDescription hidden>Atualizar os dados do usuário</DialogDescription>
                    </DialogHeader>
                    <UpdateUserForm user={user} />
                </DialogContent>
            </Dialog>
        </>
    );
}
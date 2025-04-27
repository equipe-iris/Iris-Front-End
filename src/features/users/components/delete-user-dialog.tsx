import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CircleAlert, Loader2 } from "lucide-react";
import { useDeleteUser } from "../api/delete-user";
import { toast } from "sonner";
import { User } from "./users-table-columns";

interface DeleteUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function DeleteUserDialog({ user, open, onOpenChange }: DeleteUserDialogProps) {

    const deleteUserMutation = useDeleteUser({
        mutationConfig: {
            onSuccess: () => {
                toast.success("Usuário excluído com sucesso.");
                onOpenChange(false);
            },
            onError: (error) => {
                toast.error(`Não foi possível excluir o usuário: ${error}`);
                console.log(error);
                onOpenChange(false);
            },
        },
    });

    const isPending = deleteUserMutation.isPending;

    function onSubmit(userId: string) {
        deleteUserMutation.mutate(userId);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} >
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle hidden>Excluir usuário</DialogTitle>
                    <DialogDescription hidden>Excluir um usuário do sistema</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-3 py-4 text-zinc-700">
                    <CircleAlert size={48} className="text-red-500" />
                    <div className="flex flex-col items-center justify-center">
                        <p>
                            Tem certeza que deseja excluir o usuário <span className="font-semibold text-zinc-800">{user.name}</span>?
                        </p>
                        <p>Essa ação não poderá ser desfeita.</p>
                    </div>
                    <div className="w-full flex items-center justify-evenly mt-6">
                        <DialogClose
                            className="px-4 py-2 text-sm font-medium rounded-md cursor-pointer hover:bg-muted-foreground/20 hover:text-zinc-800 transition-colors">
                            Cancelar
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={() => onSubmit(user.id)}
                        >
                            {isPending && <Loader2 className="mr-1 size-4 animate-spin" />}
                            Excluir
                        </Button>
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    );
}
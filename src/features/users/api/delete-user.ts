import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUsersQueryOptions } from "./get-users";
import { api } from "@/lib/api-client";

export async function deleteUser(userId: string): Promise<void> {
    await api.delete(`/users/${userId}`)
    return;
}

type UseDeleteUserOptions = {
    mutationConfig?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({
    mutationConfig,
}: UseDeleteUserOptions = {}) => {
    const queryClient = useQueryClient();

    const { onSuccess, ...restConfig } = mutationConfig || {};

    return useMutation({
        onSuccess: (...args) => {
            queryClient.invalidateQueries({
                queryKey: getUsersQueryOptions().queryKey,
            });
            onSuccess?.(...args);
        },
        ...restConfig,
        mutationFn: deleteUser,
    });
};
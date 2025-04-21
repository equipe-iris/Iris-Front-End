import { MutationConfig } from "@/lib/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { getUsersQueryOptions } from "./get-users";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function deleteUser(userId: string): Promise<void> {
    // return api.delete(`/user/${userId}`)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, 1000)
    })
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
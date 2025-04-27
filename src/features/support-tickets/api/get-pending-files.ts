import { useQuery } from "@tanstack/react-query";

import { FileCardProps } from "../components/imported-files-list";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { formatDateTime } from "@/lib/utils";

// const PENDING_FILES_MOCK: FileCardProps[] = [
//     { name: "Chamados Porto.csv", upload_datetime: "10/01/2023" },
// ]

function getPendingFiles(): Promise<FileCardProps[]> {
    return api.get<FileCardProps[]>("/files/pending-files").then((response) => {
        return response.map((file) => ({
            ...file,
            upload_datetime: formatDateTime(file.upload_datetime),
        }));
    });
};

 export function getPendingFilesQueryOptions() {
    return {
        queryKey: ["pending-files"],
        queryFn: getPendingFiles,
    }
}

type usePendingFilesOptions = {
    queryConfig?: QueryConfig<typeof getPendingFilesQueryOptions>;
}

export function usePendingFiles({ queryConfig }: usePendingFilesOptions = {}) {
    return useQuery({
        ...getPendingFilesQueryOptions(),
        ...queryConfig
    })
}
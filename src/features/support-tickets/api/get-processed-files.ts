import { useQuery } from "@tanstack/react-query";

import { FileCardProps } from "../components/imported-files-list";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { formatDateTime } from "@/lib/utils";

// const FILES_MOCK: FileCardProps[] = [
//     { name: "Chamados Porto.csv", upload_datetime: "10/01/2023", finished_at: "10/02/2023" },
//     { name: "Exportar Jira 20230210", upload_datetime: "10/02/2023", finished_at: "10/02/2023" },
//     { name: "Chamados x", upload_datetime: "10/03/2023", finished_at: "10/02/2023" },
//     { name: "Exportar Jira 20230210", upload_datetime: "10/02/2023", finished_at: "10/02/2023" },
//     { name: "Chamados x", upload_datetime: "10/03/2023", finished_at: "10/02/2023" },
// ]

function getProcessedFiles(): Promise<FileCardProps[]> {
    return api.get<FileCardProps[]>("/files/processed-files").then((response) => {
        return response.map((file) => ({
            ...file,
            upload_datetime: formatDateTime(file.upload_datetime),
            finished_at: file.finished_at ? formatDateTime(file.finished_at) : undefined,
        }));
    })
};

function getProcessedFilesQueryOptions() {
    return {
        queryKey: ["processed-files"],
        queryFn: getProcessedFiles,
        refetchInterval: 1000 * 60 * 1,
        refetchOnWindowFocus: true,
    }
}

type useProcessedFilesOptions = {
    queryConfig?: QueryConfig<typeof getProcessedFilesQueryOptions>;
}

export function useProcessedFiles({ queryConfig }: useProcessedFilesOptions = {}) {
    return useQuery({
        ...getProcessedFilesQueryOptions(),
        ...queryConfig
    })
}
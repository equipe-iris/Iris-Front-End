import { useQuery } from "@tanstack/react-query";

import { FileCardProps } from "../components/imported-files-list";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";

// const FILES_MOCK: FileCardProps[] = [
//     { name: "Chamados Porto.csv", upload_datetime: "10/01/2023", finished_at: "10/02/2023" },
//     { name: "Exportar Jira 20230210", upload_datetime: "10/02/2023", finished_at: "10/02/2023" },
//     { name: "Chamados x", upload_datetime: "10/03/2023", finished_at: "10/02/2023" },
//     { name: "Exportar Jira 20230210", upload_datetime: "10/02/2023", finished_at: "10/02/2023" },
//     { name: "Chamados x", upload_datetime: "10/03/2023", finished_at: "10/02/2023" },
// ]

function getProcessedFiles(): Promise<FileCardProps[]> {
    return api.get("/files/processed-files")
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
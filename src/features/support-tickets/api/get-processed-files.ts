import { useQuery } from "@tanstack/react-query";

import { FileCardProps } from "../components/imported-files-list";

import { QueryConfig } from "@/lib/react-query";
import { api } from "@/lib/api-client";
import { formatDateTime } from "@/lib/utils";

function getProcessedFiles(): Promise<FileCardProps[]> {
    return api.get<FileCardProps[]>("/files/processed-files").then((response) => {
        return response.map((file) => ({
            ...file,
            upload_datetime: formatDateTime(file.upload_datetime),
            finished_at: file.finished_at ? formatDateTime(file.finished_at) : undefined,
        }));
    })
};

export function getProcessedFilesQueryOptions() {
    return {
        queryKey: ["processed-files"],
        queryFn: getProcessedFiles,
        refetchInterval: 1000 * 60 * 0.25,
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
import { QueryConfig } from "@/lib/react-query";
import { FileCardProps } from "../components/imported-files-list";
import { useQuery } from "@tanstack/react-query";

const PENDING_FILES_MOCK: FileCardProps[] = [
    { name: "Chamados Porto.csv", upload_datetime: "10/01/2023" },
]

function getPendingFiles(): Promise<FileCardProps[]> {
    //return api.get("/files/pending-files")
    return new Promise((resolve => {
        setTimeout(() => {
            resolve(PENDING_FILES_MOCK);
        }, 1000);
    }));
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
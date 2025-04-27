"use client";

import { usePendingFiles } from "../api/get-pending-files";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, LoaderCircle } from "lucide-react";

export function PendingFilesList() {
    const pendingFilesQuery = usePendingFiles();
    const files = pendingFilesQuery.data || [];

    const isLoading = pendingFilesQuery.isPending;
    const noFiles = files?.length === 0;

    if (isLoading) return (
        <Card className="h-[500px] flex flex-col col-span-2 xl:col-span-1">
            <CardHeader>
                <CardTitle>Arquivos em processamento</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <Skeleton className="w-full h-full" />
            </CardContent>
        </Card>
    )

    return (
        <Card className="h-[500px] flex flex-col col-span-2 xl:col-span-1">
            <CardHeader>
                <CardTitle>Arquivos em processamento</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
                    {noFiles ? (
                        <div className="flex flex-1 items-center justify-center h-full">
                            <span className="text-muted-foreground text-center">
                                Nenhum arquivo sendo processado.
                            </span>
                        </div>
                    ) : (
                        files.map((file, index) => (
                            <div key={index} className="p-4 odd:bg-muted/40">
                                <FileCard
                                    name={file.name}
                                    upload_datetime={file.upload_datetime}
                                />
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
export interface FileCardProps {
    name: string;
    upload_datetime: string;
}

function FileCard({ name, upload_datetime }: FileCardProps) {
    return (
        <div className="relative flex items-center gap-2.5">
            <div className="flex flex-1 gap-2.5">
                <FileText className="size-12 text-muted-foreground" aria-hidden="true" />
                <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-px">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/90">
                            {name}
                        </p>
                        <div className="flex flex-col gap-4">
                            <p className="text-xs text-muted-foreground">
                                Data de importação: {upload_datetime}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                                <LoaderCircle className="size-5 animate-spin" />
                                <span>Processando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
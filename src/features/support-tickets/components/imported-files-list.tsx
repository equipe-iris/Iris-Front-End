"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useProcessedFiles } from "../api/get-processed-files";
import { Skeleton } from "@/components/ui/skeleton";

export function ImportedFilesList() {
    const processedFilesQuery = useProcessedFiles();
    const files = processedFilesQuery.data || [];

    const isLoading = processedFilesQuery.isPending;
    const noFiles = files?.length === 0;

    if (isLoading) return (
        <Card className="h-[500px] flex flex-col col-span-2 xl:col-span-1">
            <CardHeader>
                <CardTitle>Arquivos importados</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <Skeleton className="w-full h-full" />
            </CardContent>
        </Card>
    )

    return (
        <Card className="h-[500px] flex flex-col col-span-2 xl:col-span-1">
            <CardHeader>
                <CardTitle>Arquivos importados</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
                    {noFiles ? (
                        <div className="flex flex-1 items-center justify-center h-full">
                            <span className="text-muted-foreground text-center">
                                Nenhum arquivo foi importado até o momento.
                            </span>
                        </div>
                    ) : (
                        files.map((file, index) => (
                            <div key={index} className="p-4 odd:bg-muted/40">
                                <FileCard
                                    name={file.name}
                                    upload_datetime={file.upload_datetime}
                                    finished_at={file.finished_at}
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
    finished_at?: string;
}

function FileCard({ name, upload_datetime, finished_at }: FileCardProps) {
    return (
        <div className="relative flex items-center gap-2.5">
            <div className="flex flex-1 gap-2.5">
                <FileText className="size-12 text-muted-foreground" aria-hidden="true" />
                <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-px">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/90">
                            {name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Data de importação: {upload_datetime}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Finalizado em: {finished_at}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
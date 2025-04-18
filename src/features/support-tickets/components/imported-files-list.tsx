import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatBytes } from "@/lib/utils";
import { FileText } from "lucide-react";

const FILES_MOCK: FileCardProps[] = [
    { name: "Chamados Porto.csv", size: 123456, upload_date: "10/01/2023" },
    { name: "Exportar Jira 20230210", size: 234567, upload_date: "10/02/2023" },
    { name: "Chamados x", size: 345678, upload_date: "10/03/2023" },
    { name: "Exportar Jira 20230210", size: 234567, upload_date: "10/02/2023" },
    { name: "Chamados x", size: 345678, upload_date: "10/03/2023" },
]

export function ImportedFilesList() {
    return (
        <Card className="h-[500px] flex flex-col">
            <CardHeader>
                <CardTitle>Arquivos importados</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0">
                    {FILES_MOCK.map((file, index) => (
                        <div key={index} className="p-4 odd:bg-muted/40">
                            <FileCard
                                name={file.name}
                                size={file.size}
                                upload_date={file.upload_date}
                            />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

export interface FileCardProps {
    name: string;
    size: number;
    upload_date: string;
}

function FileCard({ name, size, upload_date }: FileCardProps) {
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
                            {formatBytes(size)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            Data de importação: {upload_date}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
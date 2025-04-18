"use client"

import { cn, formatBytes } from "@/lib/utils";
import { FileText, Upload, X } from "lucide-react";
import { useCallback, useState } from "react";
import Dropzone, { FileRejection, type DropzoneProps } from "react-dropzone";
import { toast } from "sonner";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface FileUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
    value?: File[];
    onChangeValue?: (files: File[]) => void;
    onUpload?: (files: File[]) => void;
    progress?: Record<string, number>;
    accept?: DropzoneProps["accept"];
    maxSize?: DropzoneProps["maxSize"];
    maxFiles?: DropzoneProps["maxFiles"];
    multiple?: boolean;
    disabled?: boolean;
}

function FileUploader({
    value,
    onChangeValue,
    //onUpload,
    progress,
    accept = {},
    maxSize = 1024 * 1024 * 2,
    maxFiles = 1,
    multiple = false,
    disabled = false,
    className,
    ...dropzoneProps
}: FileUploaderProps) {

    const [files, setFiles] = useState<File[]>(value || []);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
            if (!multiple && maxFiles === 1 && acceptedFiles.length > 1) {
                toast.error("Apenas um arquivo pode ser enviado por vez.")
            }

            const updatedFiles = [...files, ...acceptedFiles];
            setFiles(updatedFiles);
            onChangeValue?.(updatedFiles);

            if (rejectedFiles.length > 0) {
                rejectedFiles.forEach(({ file }) => {
                    toast.error(`Arquivo ${file.name} não foi aceito. Verifique o tamanho e o formato.`);
                })
            }
        }, [files, maxFiles, multiple, setFiles, onChangeValue]
    )

    function onRemove(index: number) {
        if (!files) return;
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        onChangeValue?.(newFiles);
    }

    const isDisabled = disabled || (files?.length ?? 0) >= maxFiles;

    return (
        <div className="relative flex flex-col gap-6 overflow-hidden">
            <Dropzone
                onDrop={onDrop}
                accept={accept}
                maxSize={maxSize}
                maxFiles={maxFiles}
                multiple={maxFiles > 1 || multiple}
                disabled={isDisabled}
            >
                {({ getRootProps, getInputProps, isDragActive }) => (
                    <div
                        {...getRootProps()}
                        className={cn(
                            "group relative grid h-52 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25",
                            "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            isDragActive && "border-muted-foreground/50",
                            isDisabled && "pointer-events-none opacity-60",
                            className
                        )}
                        {...dropzoneProps}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                                <div className="rounded-full border border-dashed p-3">
                                    <Upload
                                        className="size-7 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                                <p className="font-medium text-muted-foreground">
                                    Solte os arquivos aqui
                                </p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-4 sm:px-5">
                                <div className="rounded-full border border-dashed p-3">
                                    <Upload
                                        className="size-7 text-muted-foreground"
                                        aria-hidden="true"
                                    />
                                </div>
                                <div className="flex flex-col gap-px">
                                    <p className="font-medium text-muted-foreground">
                                        Arraste e solte os arquivos aqui ou clique para selecionar direto do seu dispositivo
                                    </p>
                                    <p className="text-sm text-muted-foreground/70">
                                        Você pode enviar
                                        {maxFiles > 1
                                            ? ` arquivos (de até ${formatBytes(maxSize)} cada)`
                                            : ` um arquivo de até ${formatBytes(maxSize)}`}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Dropzone>
            {files?.length ? (
                <div className="h-fit w-full px-3">
                    <div className="flex max-h-48 flex-col gap-4">
                        {files?.map((file, index) => (
                            <FileCard
                                key={index}
                                file={file}
                                onRemove={() => onRemove(index)}
                                progress={progress?.[file.name]}
                            />
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export { FileUploader };

interface FileCardProps {
    file: File
    onRemove: () => void
    progress?: number
}

function FileCard({ file, progress, onRemove }: FileCardProps) {
    return (
        <div className="relative flex items-center gap-2.5">
            <div className="flex flex-1 gap-2.5">
                <FileText className="size-10 text-muted-foreground" aria-hidden="true" />
                <div className="flex w-full flex-col gap-2">
                    <div className="flex flex-col gap-px">
                        <p className="line-clamp-1 text-sm font-medium text-foreground/80">
                            {file.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {formatBytes(file.size)}
                        </p>
                    </div>
                    {progress ? <Progress value={progress} /> : null}
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="size-7"
                    onClick={onRemove}
                >
                    <X className="size-4" aria-hidden="true" />
                    <span className="sr-only">Remove file</span>
                </Button>
            </div>
        </div>
    )
}
"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';
import { ticketsUploadSchema, TicketsUploadSchema, useUploadTicketsFile } from '../api/upload-files';
import { toast } from 'sonner';


export function TicketsUploader() {
    const form = useForm<TicketsUploadSchema>({
        resolver: zodResolver(ticketsUploadSchema),
        defaultValues: {
            tickets: []
        },
        mode: 'onSubmit'
    });

    const uploadTicketsFileMutation = useUploadTicketsFile({
        mutationConfig: {
            onSuccess: () => {
                toast.success('Chamados importados com sucessso!', {
                    description: 'Você pode já pode visualizar os resultados.',
                    closeButton: true,
                    duration: Infinity,
                })
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onError: (error: any) => {
                toast.error(error?.erro || 'Erro ao importar chamados. Verifique o arquivo e tente novamente.');
                console.log(error);
            },
        }
    })

    const isLoading = uploadTicketsFileMutation.isPending
    const isError = uploadTicketsFileMutation.isError
    const isSuccess = uploadTicketsFileMutation.isSuccess

    function onSubmit(data: TicketsUploadSchema) {
        uploadTicketsFileMutation.mutate({ data })
    }

    function handleFileChange(files: File[]) {
        form.setValue("tickets", files, { shouldValidate: true });
        uploadTicketsFileMutation.reset();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-6 bg-white p-6 rounded-md shadow-md h-[500px] col-span-2"
            >
                <FormField
                    control={form.control}
                    name="tickets"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-base mb-2'>Importar novos chamados</FormLabel>
                            <FormControl>
                                <FileUploader
                                    value={field.value}
                                    accept={{ ['text/csv']: ['.csv'] }}
                                    onChangeValue={handleFileChange}
                                    maxFiles={1}
                                    maxSize={1024 * 1024 * 5}
                                    loading={isLoading}
                                    error={isError}
                                    success={isSuccess}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='mt-auto'>
                    Importar
                </Button>
            </form>
        </Form>
    )
}
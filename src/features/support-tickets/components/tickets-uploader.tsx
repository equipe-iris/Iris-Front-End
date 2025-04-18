"use client"

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { FileUploader } from '@/components/file-uploader';
import { Button } from '@/components/ui/button';

const ticketsUploadSchema = z.object({
    tickets: z.array(z.instanceof(File))
})

type TicketsUploadSchema = z.infer<typeof ticketsUploadSchema>;


export function TicketsUploader() {
    const form = useForm<TicketsUploadSchema>({
        resolver: zodResolver(ticketsUploadSchema),
        defaultValues: {
            tickets: []
        }
    });

    function onSubmit(data: TicketsUploadSchema) {
        console.log(data.tickets);
    }
    
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col gap-6 bg-white p-6 rounded-md shadow-md h-[500px]"
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
                                    accept={{['text/csv']: ['.csv']}}
                                    onChangeValue={field.onChange}
                                    maxFiles={1}
                                    maxSize={1024 * 1024 * 5}
                                    //progress={progress}
                                    //disabled
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
"use client";

import React from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    SortingState
} from "@tanstack/react-table";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DataTablePagination } from "@/components/data-table-pagination";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumn?: keyof TData;
    filterValue?: string;
}

export function DataTable<TData, TValue>({ columns, data, filterColumn, filterValue }: DataTableProps<TData, TValue>) {

    const [sorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        }
    });

    React.useEffect(() => {
        if (filterValue !== undefined && filterColumn) {
            table.getColumn(filterColumn as string)?.setFilterValue(filterValue);
        }
    }, [filterValue, filterColumn, table]);

    return (
        <div>
            {/* <div className="flex items-center py-4">
                <Input
                    placeholder="Pesquisar por nome, email..."
                    value={table.getColumn("name")?.getFilterValue() as string || ""}
                    onChange={(event) => {
                        const value = event.target.value;
                        table.getColumn("name")?.setFilterValue(value);
                    }}
                    className="max-w-sm"
                />
            </div> */}
            <div className="rounded-md border">
                <Table className="min-h-[500px] table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            <>
                                {table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                                {/* Linhas vazias para completar a página */}
                                {Array.from({
                                    length: table.getState().pagination.pageSize - table.getRowModel().rows.length,
                                }).map((_, idx) => (
                                    <TableRow key={`empty-${idx}`} aria-hidden="true">
                                        {columns.map((_, colIdx) => (
                                            <TableCell key={colIdx} />
                                        ))}
                                    </TableRow>
                                ))}
                            </>
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}

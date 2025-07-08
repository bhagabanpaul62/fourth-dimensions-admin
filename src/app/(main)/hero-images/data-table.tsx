'use client';

import * as React from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import Link from 'next/link';
import { deleteHeroImage } from '@/lib/actions';
import type { HeroImage } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

interface HeroImagesDataTableProps {
  data: HeroImage[];
}

export function HeroImagesDataTable({ data }: HeroImagesDataTableProps) {
  const { toast } = useToast();
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'displayOrder', desc: false },
  ]);
  const [isPending, startTransition] = React.useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      try {
        await deleteHeroImage(id);
        toast({
          title: 'Success',
          description: 'Hero image deleted successfully.',
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error deleting hero image',
          description: error.message,
        });
      }
    });
  };
  
  const columns: ColumnDef<HeroImage>[] = [
    {
      accessorKey: 'displayOrder',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Order
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="text-center">{row.original.displayOrder}</div>,
    },
    {
        accessorKey: 'imageUrl',
        header: 'Image',
        cell: ({ row }) => (
            <img
                src={row.original.imageUrl}
                alt={row.original.title || 'Hero Image'}
                width={100}
                height={56}
                className="rounded-md object-cover h-14 w-24"
                data-ai-hint="website banner"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = 'https://placehold.co/100x56.png';
                }}
            />
        )
    },
    {
      accessorKey: 'title',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Title
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
        accessorKey: 'isActive',
        header: 'Status',
        cell: ({ row }) => {
            return row.original.isActive ? (
                <Badge variant="secondary">Active</Badge>
            ) : (
                <Badge variant="outline">Inactive</Badge>
            )
        }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const heroImage = row.original;
        return (
          <AlertDialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/hero-images/${heroImage.id}/edit`}>Edit</Link>
                </DropdownMenuItem>
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem className="text-destructive" onSelect={(e) => e.preventDefault()}>
                    Delete
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the hero image.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(heroImage.id)}
                  disabled={isPending}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  {isPending ? 'Deleting...' : 'Delete'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

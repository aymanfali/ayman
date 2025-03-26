import { DataTable } from '@/components/dashboard/data-table';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Check, PenIcon, PlusCircle, TrashIcon } from 'lucide-react';

import { DateFormatter } from '@/components/date-formater';
import InputError from '@/components/input-error';
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
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Transition } from '@headlessui/react';
import { FormEventHandler, useEffect } from 'react';
import { toast } from 'sonner';

interface Category {
    id: number;
    name: string;
    image: string;
    status: string;
    count: number;
    created_at: Date;
}

interface Flash {
    success?: string;
    danger?: string;
}

export default function Index({ categories }: { categories: Category[] }) {
    const { flash } = usePage<{ flash: Flash }>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Categories',
            href: '/dashboard/categories',
        },
    ];

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
    }, [flash.success]);

    const {
        data,
        setData,
        errors,
        post,
        delete: destroy,
        reset,
        clearErrors,
        processing,
        recentlySuccessful,
    } = useForm({
        id: null as number | null,
        name: '',
        image: null as File | null,
    });

    const closeModal = () => {
        clearErrors();
        reset();
    };

    const handleCreate: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('categories.store'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const handleDelete = (id) => {
        destroy(route('categories.destroy', id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const columns: ColumnDef<Category>[] = [
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Category Name
                        <ArrowUpDown />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'image',
            header: 'Image',
            cell: ({ row }) => (
                <img
                    src={`/storage/${row.original.image}`}
                    alt={row.original.name}
                    className="border-accent h-10 w-10 rounded border p-1"
                    onError={(e) => (e.target.src = '/ayman.png')}
                />
            ),
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Status
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const status = row.getValue('status');
                // Define status colors for light & dark themes
                const statusClasses = {
                    valid: 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200',
                    invalid: 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200',
                    pending: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
                    default: 'bg-gray-200 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
                };

                return <span className={`rounded px-2 py-1 font-medium ${statusClasses[status] || statusClasses.default}`}>{status}</span>;
            },
        },
        {
            accessorKey: 'count',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Items Count
                        <ArrowUpDown />
                    </Button>
                );
            },
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Created At
                        <ArrowUpDown />
                    </Button>
                );
            },
            cell: ({ row }) => {
                return <DateFormatter isoString={String(row.original.created_at)} />;
            },
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            // cell: ({ row }) => <DropdownMenuComponent triggerLabel={<EllipsisVertical />} menuItems={menuItems} />,
            cell: ({ row }) => {
                const item = row.original;
                return (
                    <>
                        <Link href={`categories/${item.id}/edit`}>
                            <Button variant={'ghost'}>
                                <PenIcon />
                            </Button>
                        </Link>

                        {/* delete item alert dialog */}
                        <AlertDialog>
                            <AlertDialogTrigger>
                                <Button variant={'ghost'}>
                                    <TrashIcon />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you sure to delete [ {item.name} ] ?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will permanently delete the selected item! Continue?
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(item.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="p-4">
                {/* New category dialog */}
                <Dialog>
                    <DialogTrigger>
                        <Button className="flex gap-2">
                            <PlusCircle />
                            New Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>New Category</DialogTitle>
                            <DialogDescription />
                        </DialogHeader>
                        <form onSubmit={handleCreate}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-1 items-center">
                                    <Label htmlFor="name" className="mb-5">
                                        Category Name
                                    </Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="col-span-3" />
                                    <InputError message={errors.name} />
                                </div>
                                <div className="grid grid-cols-1 items-center">
                                    <Label htmlFor="image" className="mb-5">
                                        Image
                                    </Label>
                                    <Input
                                        id="image"
                                        type="file"
                                        onChange={(e) => setData('image', e.target.files?.[0] || null)}
                                        className="col-span-3"
                                    />
                                    <InputError message={errors.image} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit" disabled={processing}>
                                    Submit
                                </Button>
                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="flex gap-1 text-sm text-neutral-600">
                                        <Check /> Saved
                                    </p>
                                </Transition>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                <DataTable
                    data={categories}
                    columns={columns}
                    filterPlaceholder="Search by ..."
                    onDelete={(selectedIds) => {
                        const selectedCategoryIds = categories.filter((category) => selectedIds.includes(category.id)).map((category) => category.id);
                        selectedCategoryIds.forEach((item: number) => handleDelete(item));
                    }}
                />
            </div>
        </AppLayout>
    );
}

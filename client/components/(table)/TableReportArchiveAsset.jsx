"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useFetchListDeletion } from "@/hooks/penghapusan_aset/useFetchListDeletion";
import { useDeleteDeletion } from "@/hooks/penghapusan_aset/useDeleteDeletion";
import { toast } from "sonner";

const TableReportArchiveAsset = () => {

    const { data, isLoading, refetch } = useFetchListDeletion()
    console.log("🚀 ~ TableReportArchiveAsset ~ data:", data)
    const router = useRouter();

    const { mutate: deleteDeletion } = useDeleteDeletion({
        onSuccess: () => {
            toast.info("Berhasil menghapus data")
            refetch()
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        }
    })

    const findDataById = (id) => {
        return data.find(item => item.id === id);
    };

    const columns = [
        {
            header: "Nomor Penghapusan",
            accessorKey: "id",
            cell: (info) => {
                const text = info.getValue();
                return <p className="">{text}</p>;
            },
        },
        {
            header: "Title",
            accessorKey: "title",
            cell: (info) => {
                const text = info.getValue();
                const maxLength = 60; // Tentukan panjang maksimum yang diinginkan
                const truncatedText = text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

                return <p className="">{truncatedText}</p>;
            },
        },
        {
            header: "Items",
            accessorKey: "items",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (info) => {
                const status = info.getValue();
                let bgColor = "";
                let textColor = "";

                switch (status) {
                    case "Pending":
                        bgColor = "bg-black";
                        textColor = "text-white";
                        break;
                    case "Accepted":
                        bgColor = "bg-green-100";
                        textColor = "text-green-700";
                        break;
                    case "Rejected":
                        bgColor = "bg-red-100";
                        textColor = "text-red-700";
                        break;
                    default:
                        bgColor = "bg-gray-100";
                        textColor = "text-gray-700";
                        break;
                }

                return (
                    <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 ${bgColor}`}>
                        <p className={`whitespace-nowrap text-xs ${textColor}`}>{status}</p>
                    </span>
                );
            },
        },
        {
            header: "Tanggal",
            accessorKey: "createdAt",
            cell: (info) => <p>{moment(info.getValue()).format("DD-MM-YYYY")}</p>,
        },
    ];

    const handleNewItemClick = (id) => {
        router.push(`/admin/laporan_pemusnahan_aset/${id}`);
    };

    const hendleEditClick = (id) => {
        const deletion = findDataById(id)
        if (deletion.status !== "Accepted" && deletion.status !== "Rejected") {
            router.push(`/admin/laporan_pemusnahan_aset/${id}/edit`);
        } else {
            toast.info("Laporan sudah direview tidak bisa mengubah laporan")
        }
    };

    const handleDeleteClik = (id) => {
        const deletion = findDataById(id)
        if (deletion.status !== "Accepted" && deletion.status !== "Rejected") {
            const confirmation = confirm(
                "Apakah anda yakin akan menghapus data laporan ini?",
            );
            if (confirmation) {
                deleteDeletion(id)
            }
        } else {
            toast.info("Laporan sudah direview tidak bisa menghapus laporan")
        }
    };

    if (isLoading) {
        return <div className="flex justify-center items-center">
            <Spinner />
        </div>
    }

    return (
        <>
            <BasicTable
                data={data}
                columns={columns}
                handleNewItemClick={handleNewItemClick}
                handleDeleteClick={handleDeleteClik}
                handleEditClick={hendleEditClick}
            />
        </>
    );
};

export default TableReportArchiveAsset;

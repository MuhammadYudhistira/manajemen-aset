"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useFetchRepair } from "@/hooks/repair/useFetchRepair";
import { useDeleteRepair } from "@/hooks/repair/useDeleteRepair";
import { toast } from "sonner";

const TableRepairReport = () => {

    const { data, isLoading, refetch } = useFetchRepair()
    const router = useRouter();

    const { mutate: deleteRepair } = useDeleteRepair({
        onSuccess: () => {
            toast.info("Berhasil menghapus laporan perbaikan")
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
            header: "Nama Aset",
            accessorKey: "detail_aset.aset.nama_barang",
            cell: (info) => {
                const row = info.row.original;
                const kode = row?.detail_aset?.kode_barang;
                return (
                    <p>
                        {info.getValue()} ({kode})
                    </p>
                );
            },
        },
        {
            header: "Hal",
            accessorKey: "hal",
            cell: (info) => {
                const text = info.getValue();
                const maxLength = 30; // Tentukan panjang maksimum yang diinginkan
                const truncatedText = text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

                return <p className="">{truncatedText}</p>;
            },
        },
        {
            header: "Kerusakan",
            accessorKey: "laporan_kerusakan.perihal",
            cell: (info) => {
                const text = info.getValue();
                const maxLength = 30; // Tentukan panjang maksimum yang diinginkan
                const truncatedText = text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

                return <p className="">{truncatedText}</p>;
            },
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: (info) => {
                const status = info.getValue();
                let bgColor = "";
                let textColor = "";

                switch (status) {
                    case "Reported":
                        bgColor = "bg-amber-100";
                        textColor = "text-amber-700";
                        break;
                    case "Approved":
                        bgColor = "bg-green-100";
                        textColor = "text-green-700";
                        break;
                    case "Completed":
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
        router.push(`/head/laporan_perbaikan/${id}`);
    };
    
    const handleDeleteClik = (id) => {
        const laporan = findDataById(id)
        if (laporan.status !== "Approved" && laporan.status !== "Completed") {
            const confirmation = confirm(
                "Apakah anda yakin akan menghapus data laporan ini?",
            );
            if (confirmation) {
                deleteRepair(id)
            }
        } else {
            toast.info("Laporan sudah disetujui tidak bisa menghapus laporan")
        }
    };

    const handleEditClick = (id) => {
        const laporan = findDataById(id)
        if (laporan.status !== "Approved" && laporan.status !== "Completed") {
            router.push(`/head/laporan_perbaikan/${id}/edit`);
        } else {
            toast.info("Laporan sudah disetujui tidak bsa mengedit laporan")
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
                handleEditClick={handleEditClick}
            />
        </>
    );
};

export default TableRepairReport;

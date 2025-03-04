"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useFetchDRByUser } from "@/hooks/damage/useFetchDRByUser";
import { useTransitionRouter } from 'next-view-transitions'
import { useDeleteDamageReport } from "@/hooks/damage/useDeleteDamageReport";
import { toast } from "sonner";

const TableDamageReport = () => {

    const { data, isLoading, refetch } = useFetchDRByUser()

    const findDataById = (id) => {
        return data.find(item => item.id === id);
    };

    const { mutate: deleteDamageReport, isPending } = useDeleteDamageReport({
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            toast.info("Berhasil menghapus data laporan kerusakan")
            refetch()
        }
    })

    const router = useTransitionRouter();

    const columns = [
        {
            header: "Nama Aset",
            accessorKey: "detail_pengadaan.barang.nama_barang",
            cell: (info) => {
                const row = info.row.original;
                const kode = row?.detail_pengadaan?.id;
                return (
                    <p>
                        {info.getValue()} ({kode})
                    </p>
                );
            },
        },
        {
            header: "Perihal",
            accessorKey: "perihal",
            cell: (info) => {
                const text = info.getValue();
                const maxLength = 50; // Tentukan panjang maksimum yang diinginkan
                const truncatedText = text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

                return <p className="">{truncatedText}</p>;
            },
        },
        {
            header: "Ruangan",
            accessorKey: "detail_pengadaan.lokasi.nama_lokasi",
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

    const handleDeleteClik = (id) => {
        const laporan = findDataById(id)
        if (laporan.status !== "Approved") {
            const confirmation = confirm(
                "Apakah anda yakin akan menghapus data laporan ini?",
            );
            if (confirmation) {
                deleteDamageReport(id)
            }
        } else {
            toast.info("Laporan sudah disetujui tidak bisa menghapus laporan")
        }
    };

    const handleEditClick = (id) => {
        const laporan = findDataById(id)
        if (laporan.status !== "Approved") {
            router.push(`/staff/laporan/${id}/edit`);
        } else {
            toast.info("Laporan sudah disetujui tidak bsa mengedit laporan")
        }
    };

    const handleNewItemClick = (id) => {
        router.push(`/staff/laporan/${id}`);
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
                handleDeleteClick={handleDeleteClik}
                handleEditClick={handleEditClick}
                handleNewItemClick={handleNewItemClick}
            />
        </>
    );
};

export default TableDamageReport;

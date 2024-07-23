"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useFetchDamage } from "@/hooks/damage/useFetchDamage";

const TableDamageReportHead = () => {

    const { data, isLoading } = useFetchDamage()

    const router = useRouter();

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
            header: "Pelapor",
            accessorKey: "user.nama",
            cell: (info) => {
                const row = info.row.original;
                return (
                    <p>
                        {info.getValue()}
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
            accessorKey: "detail_aset.ruangan.nama_ruangan",
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

    const handleNewItemClick = (id) => {
        router.push(`/head/laporan_kerusakan/${id}`);
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
            />
        </>
    );
};

export default TableDamageReportHead;

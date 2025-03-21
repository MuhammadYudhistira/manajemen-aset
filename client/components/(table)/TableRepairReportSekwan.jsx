"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useFetchRepair } from "@/hooks/repair/useFetchRepair";

const TableRepairReportSekwan = () => {

    const { data, isLoading } = useFetchRepair()
    const router = useRouter();

    const columns = [
        {
            header: "Nama Aset",
            accessorKey: "laporan_kerusakan.detail_pengadaan.barang.nama_barang",
            cell: (info) => {
                const row = info.row.original;
                const kode = row?.laporan_kerusakan.detail_pengadaan?.id;
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
        router.push(`/perbaikan/${id}`);
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

export default TableRepairReportSekwan;

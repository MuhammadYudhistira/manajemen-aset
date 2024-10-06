"use client";
import React from "react";
import BasicTable from "./BasicTable";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useFetchListDeletion } from "@/hooks/penghapusan_aset/useFetchListDeletion";

const TableReportArchiveAsset = () => {

    const { data, isLoading } = useFetchListDeletion()
    const router = useRouter();

    const columns = [
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
        router.push(`/admin/laporan_pemusnahan_aset/${id}`);
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

export default TableReportArchiveAsset;

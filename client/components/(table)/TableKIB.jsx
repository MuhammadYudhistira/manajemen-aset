"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import BasicTable from "./BasicTable";
import { formatRupiah } from "@/libs/formatRupiah";
import { useFetchActiveDA } from "@/hooks/detail_aset/useFetchActiveDA";

const TableKIB = () => {
    const { data, isLoading } = useFetchActiveDA();
    const router = useRouter();

    const columns = [
        {
            header: "Kode Barang",
            accessorKey: "kode_barang",
        },
        {
            header: "Nama Barang",
            accessorKey: "aset.nama_barang",
        },
        {
            header: "Tahun Perolehan",
            accessorKey: "tahun_perolehan",
            cell: ({ getValue }) => <p>{moment(getValue()).format("YYYY")}</p>,
        },
        {
            header: "Merk/Model",
            accessorKey: "merk",
        },
        {
            header: "Ukuran",
            accessorKey: "ukuran",
            cell: ({ getValue }) => <p>{getValue() || '-'}</p>,
        },
        {
            header: "Harga Satuan",
            accessorKey: "harga_satuan",
            cell: ({ getValue }) => <p>{formatRupiah(getValue())}</p>,
        },
        {
            header: "Jumlah Barang",
            accessorKey: "jumlah_barang",
            cell: ({ getValue }) => <p>1</p>,

        },
        {
            header: "Nilai Perolehan",
            accessorKey: "harga_satuan",
            cell: ({ getValue }) => <p>{formatRupiah(getValue())}</p>,
        },
    ];

    const handleNewItemClick = (id) => {
        router.push(`/detail_aset/${id}`);
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

export default TableKIB;

"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import BasicTable from "./BasicTable";
import { formatRupiah } from "@/libs/formatRupiah";
import { useFetchActiveDP } from "@/hooks/detail_pengadaan/useFetchActiveDP";

const TableKIB = () => {
    const { data, isLoading } = useFetchActiveDP();
    const router = useRouter();

    const columns = [
        {
            header: "Kode Barang",
            accessorKey: "kode_barang",
        },
        {
            header: "Nama Barang",
            accessorKey: "barang.nama_barang",
        },
        {
            header: "Tahun Perolehan",
            accessorKey: "pengadaan.tanggal_penerimaan",
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

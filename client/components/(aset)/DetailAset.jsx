"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Link from "next/link";
import moment from "moment";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";
import {
    Spinner,
} from "@nextui-org/react";
import Image from "next/legacy/image";
import { notFound } from "next/navigation";

const DetailAset = ({ id }) => {

    const { data, isLoading, isError, error } = useFetchDetailAset(id);

    if (isError) {
        if (error.response.data.status === 404) {
            console.log(error)
            notFound()
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        );
    }

    return (
        <>
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-xl bg-white p-5 lg:grid-cols-3 lg:gap-8">
                <div className="w-full">
                    <Image
                        alt={data?.nama_barang || "Aset"}
                        src={data?.image}
                        priority
                        width={600}
                        height={450}
                        className="max-h-[450px] rounded-lg object-cover"
                    />
                </div>
                <div className="space-y-2 col-span-2">
                    <h1 className="text-xl font-bold uppercase lg:text-3xl">
                        {data.nama_barang}
                    </h1>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Merk</h3>
                        <p className="text-gray-400">{data.merk}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Deskripsi</h3>
                        <p className="text-gray-400">{data.deskripsi}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Tahun Perolehan</h3>
                        <p className="text-gray-400">
                            {moment(data.tahun_perolehan).format("DD-MM-YYYY")}
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Harga Satuan</h3>
                        <p className="text-gray-400">{data.harga_satuan}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Jumlah Barang</h3>
                        <p className="text-gray-400">{data.jumlah_barang}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Nilai Perolehan</h3>
                        <p className="text-gray-400">{data?.nilai_perolehan}</p>
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-lg font-medium">Ukuran</h3>
                        <p className="text-gray-400">{data?.ukuran}</p>
                    </div>
                </div>
            </div>
            <div className="mt-4 rounded-xl bg-white p-5">
                <h1>Detail Aset</h1>
                <div className="mt-6 overflow-x-auto">
                    {data?.Detail_Aset?.length === 0 ? (
                        "Belum Ada Detail Aset"
                    ) : (
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                            <thead className="text-center md:text-left">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Kode Barang
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Ruangan
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        Tanggal
                                    </th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        PJ
                                    </th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {data?.Detail_Aset?.map((detail) => {
                                    return (
                                        <tr key={detail.id}>
                                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                {detail.kode_barang}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {detail.ruangan.nama_ruangan}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {moment(detail.createdAt).format("DD-MM-YYYY")}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                <div className="avatar">
                                                    <p>
                                                        {detail.Penanggung_Jawab.length !== 0
                                                            ? detail?.Penanggung_Jawab[0]?.user?.nama
                                                            : "Belum ada penanggung jawab"}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <div className="lg:tooltip" data-tip="Detail">
                                                    <Link
                                                        href={`/detail_aset/${detail.id}`}
                                                    >
                                                        <MoreHorizIcon />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
};

export default DetailAset;

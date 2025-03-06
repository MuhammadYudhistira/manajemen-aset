"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React from "react";
import Link from "next/link";
import moment from "moment";
import {
    Spinner,
} from "@nextui-org/react";
import Image from "next/legacy/image";
import { notFound } from "next/navigation";
import { useFetchDetailAset } from "@/hooks/aset/useFetchDetailAset";

const DetailAset = ({ id }) => {

    const { data, isLoading, isError, error } = useFetchDetailAset(id);
    console.log("🚀 ~ DetailAset ~ data:", data)

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
                {isLoading ? (
                    <div className="flex w-full h-full flex-col gap-4">
                        <div className="skeleton h-96 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                ) : (
                    <>
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
                                {data?.nama_barang}
                            </h1>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Kode Barang</h3>
                                <p className="text-gray-400">{data.kode_barang}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Jumlah Barang</h3>
                                <p className="text-gray-400">{data?.Detail_Pengadaan?.length}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Jenis Aset</h3>
                                <p className="text-gray-400">{data.jenis_barang}</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <div className="mt-4 rounded-xl bg-white p-5">
                <h1>Detail Aset</h1>
                {isLoading ? (
                    <div className="mt-8 flex justify-center">
                        <Spinner size="lg" />
                    </div>
                ) : (
                    <div className="mt-6 overflow-x-auto">
                        {data?.Detail_Pengadaan?.length === 0 ? (
                            "Belum Ada Detail Aset"
                        ) : (
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-center md:text-left">
                                    <tr>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Kode Aset
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Lokasi
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Tahun Perolehan
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            PJ
                                        </th>
                                        <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            Status
                                        </th>
                                        <th className="px-4 py-2"></th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                    {data?.Detail_Pengadaan?.map((detail) => {
                                        return (
                                            <tr key={detail?.id}>
                                                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                                    {detail?.id}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {detail?.lokasi.nama_lokasi}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {moment(detail?.pengadaan.tanggal_penerimaan).format("DD-MM-YYYY")}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    <div className="avatar">
                                                        <p>{detail?.user?.nama}</p>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                    {detail?.status}
                                                </td>
                                                <td className="whitespace-nowrap px-4 py-2">
                                                    <div className="lg:tooltip" data-tip="Detail">
                                                        <Link
                                                            href={`/detail_aset/${detail?.id}`}
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
                )}
            </div>
        </>
    );
};

export default DetailAset;

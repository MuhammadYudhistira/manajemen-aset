"use client"
import { useFetchDetailDeletion } from "@/hooks/penghapusan_aset/useFetchDetailDeletion";
import { formatRupiah } from "@/libs/formatRupiah";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import React from "react";

const page = ({ params }) => {
    const repair = {
        status: "Pending"
    }

    const { data, isLoading } = useFetchDetailDeletion(params.id)

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <h1 className="text-2xl font-bold">Detail Usulan Pemusnahan Aset</h1>
                <div className="grid grid-cols-3">
                    <div className="col-span-2">
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Tanggal Usulan</p>
                            <p className="font-bold">{moment(new Date()).format("DD-MM-YYYY")}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Alasan Pengusulan</p>
                            <p className="font-bold">Aset sudah tidak berfungsi dengan baik</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 font-medium mt-4">Status</p>
                        {repair.status === "Pending" && (
                            <span className="inline-flex items-center justify-center rounded-full bg-black px-2.5 py-0.5 text-white">
                                <p className="whitespace-nowrap text-sm font-semibold">{repair.status}</p>
                            </span>
                        )}

                        {repair.status === "Approved" && (
                            <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                                <p className="whitespace-nowrap text-sm">{repair.status}</p>
                            </span>
                        )}

                        {repair.status === "Rejected" && (
                            <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                <p className="whitespace-nowrap text-sm">{repair.status}</p>
                            </span>
                        )}

                        {repair.status === "Completed" && (
                            <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                                <p className="whitespace-nowrap text-sm">{repair.status}</p>
                            </span>
                        )}
                    </div>
                </div>
                <div className="mt-5 overflow-x-auto">
                    <h2 className="text-xl font-bold">List Aset</h2>
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm mt-4">
                        <thead className="text-center md:text-left">
                            <tr>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Kode Barang
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Nama Aset
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Status
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Harga perolehan
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {data?.Detail_Penghapusan_Nilai_Aset?.map((aset) => {
                                return (
                                    <tr key={aset.id}>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {aset.detail_aset.kode_barang}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {aset.detail_aset.aset.nama_barang}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {aset.status}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {formatRupiah(aset.detail_aset.aset.harga_satuan)}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 space-x-2">
                                            <button>
                                                <CancelOutlinedIcon />
                                            </button>
                                            <button>
                                                <CheckCircleOutlineOutlinedIcon />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end mt-4">
                    <button className="btn bg-black text-white">Konfirmasi</button>
                </div>
            </div>
        </>
    );
};

export default page;

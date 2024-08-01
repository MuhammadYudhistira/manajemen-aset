"use client"
import { useFetchDetailDR } from "@/hooks/damage/useFetchDetailDR";
import { useFetchDetailRepair } from "@/hooks/repair/useFetchDetailRepair";
import { Spinner } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const page = ({ params }) => {

    const { data: damage, isLoading, isError, error } = useFetchDetailRepair(params.id)

    if (isError) {
        if (error.response.data.status === 404) {
            notFound()
        }
        console.log(error)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <div className="flex justify-end gap-3 items-center">
                    <p className="text-sm">Di Buat Tanggal: {moment(damage.createdAt).format("DD-MM-YYYY")}</p>
                    {damage.status === "Reported" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                            <p className="whitespace-nowrap text-sm">{damage.status}</p>
                        </span>
                    )}

                    {damage.status === "Approved" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                            <p className="whitespace-nowrap text-sm">{damage.status}</p>
                        </span>
                    )}

                    {damage.status === "Rejected" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                            <p className="whitespace-nowrap text-sm">{damage.status}</p>
                        </span>
                    )}
                </div>
                <div className="w-full space-y-2">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nama Aset</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nama Aset"
                            name="nama"
                            className="input bg-blue-50 text-sm text-black"
                            value={`${damage?.detail_aset?.aset?.nama_barang} (${damage?.detail_aset?.kode_barang})`}
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Perihal</span>
                        </div>
                        <textarea
                            type="text"
                            placeholder="Perihal"
                            name="perihal"
                            value={damage.perihal}
                            className="input textarea bg-blue-50 text-sm text-black min-h-52"
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Deskripsi Kerusakan</span>
                        </div>
                        <textarea
                            type="text"
                            placeholder="Deskripsi Kerusakan"
                            name="deskripsi"
                            value={damage.deskripsi}
                            className="input textarea bg-blue-50 text-sm text-black min-h-52"
                            disabled
                        />
                    </label>
                    {
                        damage.image ? (
                            <div className="space-y-2">
                                <span className="label-text">Bukti Kerusakan</span>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${damage.image}`}
                                    width={200}
                                    height={200}
                                    alt="damage"
                                    className="rounded-lg" />
                            </div>
                        ) : null
                    }
                    {damage.status === "Approved" && (
                        <>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Disetujui Oleh</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Disetujui Oleh"
                                    name="nama"
                                    className="input bg-blue-50 text-sm text-black"
                                    value={damage.approved_by}
                                    disabled
                                />
                            </label>
                            <label className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Disetujui Tanggal</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Disetujui Oleh"
                                    name="nama"
                                    className="input bg-blue-50 text-sm text-black"
                                    value={moment(damage.approved_date).format("DD-MM-YYYY")}
                                    disabled
                                />
                            </label>
                        </>
                    )}
                </div>
            </div>

            {damage.status === "Rejected" && (
                <div className="bg-white rounded-xl p-5 space-y-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-red-500 font-semibold">Keterangan Ditolak</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Disetujui Oleh"
                            name="nama"
                            className="input bg-red-50 text-sm text-red-500"
                            value={damage.keterangan}
                            readOnly
                        />
                    </label>
                </div>
            )}
        </>
    );
};

export default page;

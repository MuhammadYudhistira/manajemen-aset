"use client"
import NotaDinas from "@/components/(reports)/NotaDinas";
import { useFetchDetailRepair } from "@/hooks/repair/useFetchDetailRepair";
import useSession from "@/hooks/session/useSession";
import { formatRupiah } from "@/libs/formatRupiah";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({ params }) => {

    const { data: repair, isLoading } = useFetchDetailRepair(params.id)
    const { session, loading } = useSession()

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className="flex items-center justify-between ">
                <div className="rounded-md font-medium max-w-max bg-white">
                    <Breadcrumbs variant="bordered" radius="sm">
                        <BreadcrumbItem href="/head">Home</BreadcrumbItem>
                        <BreadcrumbItem href="/head/laporan_perbaikan">Laporan Perbaikan</BreadcrumbItem>
                        <BreadcrumbItem>Detail Laporan Perbaikan</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className="flex justify-end gap-3 items-center bg-white py-2 px-4 rounded-lg border">
                    <p className="text-sm">Di Buat Tanggal: {moment(repair.createdAt).format("DD-MM-YYYY")}</p>
                    {repair.status === "Reported" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                            <p className="whitespace-nowrap text-sm">{repair.status}</p>
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

            <NotaDinas
                id={repair.id}
                hal={repair.hal}
                perihal={repair.laporan_kerusakan?.perihal}
                deskripsi_kerusakan={repair.laporan_kerusakan?.deskripsi}
                biaya_perbaikan={repair.biaya_perbaikan}
                no_rekening={repair.nomor_rekening}
                createdAt={repair.createdAt}
                tanggal_laporan={repair.laporan_kerusakan?.createdAt}
                nama={repair.user?.nama}
                nip={repair.user?.nip}
                status={repair.status}
            />

            {repair.status === "Rejected" && (
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
                            value={repair.keterangan}
                            readOnly
                        />
                    </label>
                    <div className="flex justify-end">
                        <Link
                            href={`/head/laporan_perbaikan/${params.id}/edit`}
                            className="btn bg-white text-black border-black hover:bg-black hover:text-white">Perbaiki Laporan</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default page;

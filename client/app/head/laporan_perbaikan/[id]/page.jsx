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
            <div className="rounded-md font-medium max-w-max bg-white">
                <Breadcrumbs variant="bordered" radius="sm">
                    <BreadcrumbItem href="/head">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/head/laporan_perbaikan">Laporan Perbaikan</BreadcrumbItem>
                    <BreadcrumbItem>Detail Laporan Perbaikan</BreadcrumbItem>
                </Breadcrumbs>
            </div>

            <NotaDinas
                hal={repair.hal}
                perihal={repair.laporan_kerusakan.perihal}
                deskripsi_kerusakan={repair.laporan_kerusakan.deskripsi}
                biaya_perbaikan={repair.biaya_perbaikan}
                no_rekening={repair.nomor_rekening}
                createdAt={repair.createdAt}
                tanggal_laporan={repair.laporan_kerusakan.createdAt}
                nama={session?.nama}
                nip={session?.nip}
            />

            {/* <div className="rounded-xl bg-white p-5">
                <div className="flex justify-end gap-3 items-center">
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
                            value={`${repair?.detail_aset?.aset?.nama_barang} (${repair?.detail_aset?.kode_barang})`}
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Laporan Kerusakan</span>
                        </div>
                        <textarea
                            type="text"
                            placeholder="Perihal"
                            name="perihal"
                            value={repair.laporan_kerusakan?.perihal}
                            className="input textarea bg-blue-50 text-sm text-black"
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Hal</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nama Aset"
                            name="nama"
                            className="input bg-blue-50 text-sm text-black"
                            value={repair.hal}
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Biaya Perbaikan</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Biaya Perbaikan"
                            className="input bg-blue-50 text-sm text-black"
                            value={formatRupiah(repair.biaya_perbaikan)}
                            disabled
                        />
                    </label>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Nomor Rekening</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nomor Rekening"
                            className="input bg-blue-50 text-sm text-black"
                            value={repair.nomor_rekening}
                            disabled
                        />
                    </label>
                    {repair.status === "Approved" && (
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
                                    value={repair.approved_by}
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
                                    value={moment(repair.approved_date).format("DD-MM-YYYY")}
                                    disabled
                                />
                            </label>
                        </>
                    )}
                </div>
            </div> */}

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
                            href={`/staff/laporan/${params.id}/edit`}
                            className="btn bg-white text-black border-black hover:bg-black hover:text-white">Perbaiki Laporan</Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default page;

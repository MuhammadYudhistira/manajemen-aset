"use client"
import ButtonLaporan from "@/components/(button)/ButtonLaporan";
import DamageReport from "@/components/(reports)/DamageReport";
import { useFetchDetailDR } from "@/hooks/damage/useFetchDetailDR";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";

const page = ({ params }) => {

    const contentRef = useRef();
    const { data: damage, isLoading } = useFetchDetailDR(params.id)
    console.log("🚀 ~ page ~ damage:", damage)

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="rounded-md font-medium w-full md:max-w-max bg-white">
                    <Breadcrumbs variant="bordered" radius="sm">
                        <BreadcrumbItem href="/staff">Home</BreadcrumbItem>
                        <BreadcrumbItem href="/staff/laporan">Laporan Kerusakan</BreadcrumbItem>
                        <BreadcrumbItem>Detail Laporan Kerusakan</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className="flex justify-end gap-3 items-center bg-white py-2 px-4 rounded-lg border border-black w-full md:max-w-max">
                    <p className="text-sm">Di Buat Tanggal: {moment(damage?.createdAt).format("DD-MM-YYYY")}</p>
                    {damage?.status === "Reported" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-amber-100 px-2.5 py-0.5 text-amber-700">
                            <p className="whitespace-nowrap text-sm">{damage?.status}</p>
                        </span>
                    )}

                    {damage?.status === "Approved" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                            <p className="whitespace-nowrap text-sm">{damage?.status}</p>
                        </span>
                    )}

                    {damage?.status === "Rejected" && (
                        <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                            <p className="whitespace-nowrap text-sm">{damage?.status}</p>
                        </span>
                    )}
                </div>
            </div>
            <div className="mt-8 items-center justify-end flex flex-col md:flex-row">
                <ButtonLaporan contentRef={contentRef} nama_barang={damage?.detail_aset?.aset?.nama_barang} />
            </div>
            <DamageReport
                nama={damage?.user?.nama}
                createdAt={damage?.createdAt}
                deskripsi_kerusakan={damage?.deskripsi}
                perihal={damage?.perihal}
                nama_barang={damage?.detail_pengadaan?.barang?.nama_barang}
                ruangan={damage?.detail_pengadaan?.lokasi?.nama_lokasi}
                ref={contentRef}
            />
            {
                damage?.image ? (
                    <div className='rounded-xl bg-white p-5 mt-5 border'>
                        <div className="space-y-2">
                            <span className="label-text">Bukti Kerusakan</span>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${damage?.image}`}
                                width={400}
                                height={400}
                                alt="gambar kerusakan"
                                className="rounded-lg" />
                        </div>
                    </div>
                ) : null
            }
            {damage?.status === "Rejected" && (
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
                            value={damage?.keterangan}
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

"use client"
import PemusnahanAset from "@/components/(reports)/PemusnahanAset";
import { useConfirmDeletion } from "@/hooks/penghapusan_aset/useConfirmDeletion";
import { useFetchDetailDeletion } from "@/hooks/penghapusan_aset/useFetchDetailDeletion";
import { useRejectDeletion } from "@/hooks/penghapusan_aset/useRejectDeletion";
import { formatRupiah } from "@/libs/formatRupiah";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const page = ({ params }) => {

    const { data, isLoading, refetch } = useFetchDetailDeletion(params.id)

    const [keterangan, setKeterangan] = useState(null)
    const [showForm, setShowForm] = useState(null);

    const id_detail_aset = data?.Detail_Penghapusan_Nilai_Aset.map(item => item.id_detail_aset);

    const { mutate: confirmationMutate } = useConfirmDeletion({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Berhasil Menyetujui Pengajuan")
            refetch()
        }
    })

    const { mutate: rejectionMutate } = useRejectDeletion({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Berhasil Menolak Pengajuan")
            refetch()
        }
    })

    const handleTolakClick = () => {
        setShowForm('tolak');
    };

    const handleKonfirmasiClick = () => {
        setShowForm('konfirmasi');
    };

    const handleRejectForm = () => {

        const body = {
            keterangan,
            id_detail_aset
        };

        rejectionMutate({ id: params.id, body: body })
    }

    const handleConfirmForm = () => {

        const body = {
            keterangan,
            id_detail_aset
        };

        confirmationMutate({ id: params.id, body: body })

    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <div className="mr-auto hidden rounded-md font-medium md:block">
                <Breadcrumbs variant="bordered" radius="sm" classNames={{ list: "bg-white", }}>
                    <BreadcrumbItem href="/admin">Home</BreadcrumbItem>
                    <BreadcrumbItem href="/admin/laporan_pemusnahan_aset">List Pengajuan Pemusnahan</BreadcrumbItem>
                    <BreadcrumbItem >Detail Pengajuan Pemusnahan</BreadcrumbItem>
                </Breadcrumbs>
                <PemusnahanAset
                    title={data.title}
                    createdAt={data.createdAt}
                    asets={data?.Detail_Penghapusan_Nilai_Aset}
                />
            </div>
            <div className="rounded-xl bg-white p-5">
                <h1 className="text-2xl font-bold">Detail Pengajuan Pemusnahan Aset</h1>
                <div className="grid grid-cols-3">
                    <div className="col-span-2">
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Title</p>
                            <p className="font-bold">{data.title}</p>
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Alasan Pengajuan</p>
                            <p className="font-bold">{data.alasan_penghapusan}</p>
                        </div>
                    </div>
                    <div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500 font-medium">Tanggal Pengajuan</p>
                            <p className="font-bold">{moment(data.createdAt).format("DD-MM-YYYY")}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium mt-4">Status</p>
                            {data.status === "Pending" && (
                                <span className="inline-flex items-center justify-center rounded-full bg-black px-2.5 py-0.5 text-white">
                                    <p className="whitespace-nowrap text-sm font-semibold">{data.status}</p>
                                </span>
                            )}

                            {data.status === "Accepted" && (
                                <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-emerald-700">
                                    <p className="whitespace-nowrap text-sm">{data.status}</p>
                                </span>
                            )}

                            {data.status === "Rejected" && (
                                <span className="inline-flex items-center justify-center rounded-full bg-red-100 px-2.5 py-0.5 text-red-700">
                                    <p className="whitespace-nowrap text-sm">{data.status}</p>
                                </span>
                            )}
                        </div>
                        <div>
                            {(data.status === "Accepted" || data.status === "Rejected") && (
                                <>
                                    <p className="text-sm text-gray-500 font-medium mt-4">Keterangan</p>
                                    <p className="whitespace-nowrap font-bold text-black">{data.keterangan}</p>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="my-5 overflow-x-auto">
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
                                    Tahun Perolehan
                                </th>
                                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    Harga Perolehan
                                </th>
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
                                            {moment(aset.detail_aset.aset.tahun_perolehan).format("DD-MM-YYYY")}
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {formatRupiah(aset.detail_aset.aset.harga_satuan)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                {data.status !== "Accepted" && data.status !== "Rejected" && (
                    <div className="flex justify-end gap-2 mt-4">
                        <button className="btn bg-white text-Black px-8" onClick={handleTolakClick}>Tolak</button>
                        <button className="btn bg-black text-white" onClick={handleKonfirmasiClick}>Konfirmasi</button>
                    </div>
                )}
            </div>

            {showForm === 'tolak' && (
                <div className="mt-4 rounded-xl bg-white p-5">
                    <form onSubmit={handleRejectForm}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text font-medium">Alasan Penolakan</span>
                            </div>
                            <input type="text" placeholder="Alasan Penolakan" className="input input-bordered w-full max-w-xs" onChange={(e) => setKeterangan(e.target.value)} />
                        </label>
                        <button className="btn bg-white text-Black px-8 mt-4" type="submit">Tolak</button>
                    </form>
                </div>
            )}

            {showForm === 'konfirmasi' && (
                <div className="mt-4 rounded-xl bg-white p-5">
                    <form onSubmit={handleConfirmForm}>
                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text">Cara Pemusnahan</span>
                            </div>
                            <select className="select select-bordered" onChange={(e) => setKeterangan(e.target.value)}>
                                <option defaultValue hidden>Cara Pemusnahan</option>
                                <option value={"Dilelang"}>Dilelang</option>
                                <option value={"Dibakar"}>Dibakar</option>
                                <option value={"Didaur Ulang"}>Didaur Ulang</option>
                                <option value={"Dihancurkan"}>Dihancurkan</option>
                            </select>
                        </label>
                        <button className="btn bg-black text-white mt-4">Konfirmasi</button>
                    </form>
                </div>
            )}
        </>
    );
};

export default page;

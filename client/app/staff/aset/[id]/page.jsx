"use client"
import React from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import computer from "@/public/computer.jpg"
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import Image from "next/legacy/image";
import Link from "next/link";
import {
    BreadcrumbItem, Breadcrumbs, Spinner,
    Tooltip
} from "@nextui-org/react";
import moment from "moment";
import QrCode from "@/components/(reports)/QrCode";
import { formatRupiah } from "@/libs/formatRupiah";
import { useFetchDetailDP } from "@/hooks/detail_pengadaan/UseFetchDetailDP";

const page = ({ params }) => {

    const { data, isLoading } = useFetchDetailDP(params.id)
    console.log("🚀 ~ page ~ data:", data)

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <div className="mt-8 hidden items-center justify-end gap-5 sm:flex md:flex-row">
                <div className="mr-auto hidden rounded-md bg-white font-medium md:block">
                    <Breadcrumbs variant="bordered" radius="sm">
                        <BreadcrumbItem href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem>Detail Aset</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <QrCode
                    aset={`${data?.barang?.nama_barang} ${data?.merk}`}
                    kode_detail={data?.id}
                    kode_barang={data?.id}
                    ruangan={data?.lokasi?.nama_lokasi}
                    tahun={moment(data?.pengadaan?.tanggal_penerimaan).format("YYYY")}
                />
                <Link href={`/staff/laporan/aset/${params.id}`} className="btn bg-white text-black">
                    <ReportOutlinedIcon /> Laporkan kerusakan
                </Link>
            </div>
            <>
                <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                    <div className="w-full rounded-xl bg-white p-5">
                        {isLoading ? (
                            <div className="flex w-full h-full flex-col gap-4">
                                <div className="skeleton h-96 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        ) : (
                            <>
                                <div className="dropdown mb-2 sm:hidden">
                                    <div tabIndex={0} role="button">
                                        <MoreHorizIcon />
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="menu dropdown-content z-[1] w-72 space-y-2 rounded-box bg-base-100 p-2 shadow"
                                    >
                                        <li>
                                            <QrCode
                                                aset={`${data?.barang?.nama_barang} ${data?.merk}`}
                                                kode_detail={data?.id}
                                                kode_barang={data?.id}
                                                ruangan={data?.lokasi?.nama_lokasi}
                                                tahun={moment(data?.pengadaan?.tanggal_penerimaan).format("YYYY")}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="flex w-full flex-col md:flex-row gap-8">
                                    <div className="flex flex-col gap-3">
                                        <Image
                                            alt="Aset"
                                            src={
                                                data?.Detail_Aset_Images
                                                    ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${data?.Detail_Aset_Images[0]?.link}`
                                                    : computer
                                            }
                                            priority
                                            width={300}
                                            height={300}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h1 className="text-xl font-bold uppercase">
                                            {data?.barang?.nama_barang}
                                        </h1>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Kode Barang</h3>
                                            <p className="text-gray-400">{data?.id}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Nomor Pengadaan</h3>
                                            <p className="text-gray-400">{data?.nomor_pengadaan}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Lokasi</h3>
                                            <p className="text-gray-400">{data?.lokasi?.nama_lokasi}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Status</h3>
                                            <p className={data.status === "Inactive" ? `text-red-500 font-semibold uppercase ` : `text-blue-400`}>{data?.status}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4 w-full">
                                    {data?.Detail_Aset_Images?.length > 1 ? (
                                        data?.Detail_Aset_Images?.map((image) => {
                                            return (
                                                <Image
                                                    alt="Aset"
                                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${image.link}`}
                                                    priority
                                                    width={100}
                                                    height={100}
                                                    className="rounded-lg object-cover"
                                                    key={image.id}
                                                />
                                            )
                                        })
                                    ) : null}
                                </div>
                                <div className="mt-4 flex flex-col md:flex-row justify-between">
                                    <div className="w-[50%] space-y-2">
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Harga Satuan</h3>
                                            <p className="text-gray-400">{formatRupiah(data?.harga_satuan)}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Tahun Perolehan</h3>
                                            <p className="text-gray-400">{moment(data?.pengadaan?.tanggal_penerimaan).format("YYYY-MM-DD")}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Merk</h3>
                                            <p className="text-gray-400">{data?.merk}</p>
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-lg font-medium">Ukuran</h3>
                                            <p className="text-gray-400">{data?.ukuran}</p>
                                        </div>
                                        {data?.aset?.jenis_barang === 'Kendaraan' && (<>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Nomor Rangka</h3>
                                                {data?.Aset_Kendaraan?.nomor_rangka ? (
                                                    <p className="text-gray-400">{data?.Aset_Kendaraan?.nomor_rangka}</p>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Nomor Mesin</h3>
                                                {data?.Aset_Kendaraan?.nomor_mesin ? (
                                                    <p className="text-gray-400">{data?.Aset_Kendaraan?.nomor_mesin}</p>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Nomor Polisi</h3>
                                                {data?.Aset_Kendaraan?.nomor_polisi ? (
                                                    <p className="text-gray-400">{data?.Aset_Kendaraan?.nomor_polisi}</p>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">Nomor BPKB</h3>
                                                {data?.Aset_Kendaraan?.nomor_bpkb ? (
                                                    <p className="text-gray-400">{data?.Aset_Kendaraan?.nomor_bpkb}</p>
                                                ) : (
                                                    "-"
                                                )}
                                            </div>
                                        </>)
                                        }
                                        {data?.status === "Inactive" &&
                                            <div className="space-y-2">
                                                <h3 className="text-lg font-medium">keterangan</h3>
                                                <p className="text-gray-400">{data?.keterangan !== "" ? data?.keterangan : "-"}</p>
                                            </div>
                                        }
                                    </div>
                                    <div className="w-[50%] mt-4">
                                        <img
                                            alt="qrcode"
                                            src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${[process.env.NEXT_PUBLIC_QR_URL]}${params.iddetail}`}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="space-y-5">
                        <div className="rounded-xl bg-white p-5">
                            <h2 className="text-lg font-medium">Penanggung Jawab</h2>

                            <div className="p-5 flex gap-8">
                                <div className="avatar">
                                    <div className="w-32 rounded-full">
                                        <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${data.user.image}`} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-md font-semibold">{data.user.nama}</p>
                                    <p className="text-xs font-medium text-gray-500">{data.user.nip}</p>
                                    <p className="text-xs font-medium text-gray-500">{data.user.no_hp}</p>
                                    <p className="text-xs font-medium text-gray-500">{data.user.alamat}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 rounded-xl bg-white p-5 max-h-[200px] overflow-y-auto">
                            <h2 className="text-lg font-medium">Riwayat Laporan kerusakan</h2>
                            {data?.Laporan_Kerusakan?.length > 0 ? (
                                data?.Laporan_Kerusakan?.map((laporan) => {
                                    return (
                                        <div className="flex justify-between" key={laporan.id}>
                                            <div>
                                                <p className="text-sm text-gray-500">{laporan.perihal}</p>
                                                <p className="text-sm text-gray-500">{moment(laporan.createdAt).format("DD-MM-YYYY")}</p>
                                            </div>
                                            <div>
                                                <Link
                                                    href={`/laporan/${laporan.id}`}
                                                    className="btn btn-sm bg-white"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    )
                                })) : (<p>Belum ada Laporan kerusakan</p>)
                            }
                        </div>
                        <div className="space-y-2 rounded-xl bg-white p-5 max-h-[200px] overflow-y-auto">
                            <h2 className="text-lg font-medium">Riwayat Laporan Perbaikan</h2>
                            {data?.Laporan_Kerusakan?.length > 0 && (
                                data?.Laporan_Kerusakan?.map((perbaikan) => {
                                    return (
                                        perbaikan.Perbaikan !== null ? (
                                            <div className="flex justify-between" key={perbaikan.Perbaikan.id}>
                                                <div>
                                                    <p className="text-sm text-gray-500">{perbaikan.Perbaikan.hal}</p>
                                                    <p className="text-sm text-gray-500">{moment(perbaikan.Perbaikan.createdAt).format("DD-MM-YYYY")}</p>
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`/perbaikan/${perbaikan.id}`}
                                                        className="btn btn-sm bg-white"
                                                    >
                                                        View
                                                    </Link>
                                                </div>
                                            </div>
                                        ) : (
                                            <p>Belum Ada Laporan Perbaikan</p>
                                        )
                                    )
                                }))
                            }
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default page
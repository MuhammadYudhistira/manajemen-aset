"use client";
import React from "react";
import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import computer from "@/public/computer.jpg"

import qrcode from "@/public/qrcode.png";
import Image from "next/legacy/image";
import Link from "next/link";
import { useFetchDA } from "@/hooks/detail_aset/useFetchDA";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    BreadcrumbItem, Breadcrumbs, Spinner,
    Tooltip
} from "@nextui-org/react";
import { useDeleteDA } from "@/hooks/detail_aset/useDeleteDA";
import { toast } from "sonner";
import { notFound, redirect } from "next/navigation";
import moment from "moment";

const DetailAsetIdDetail = ({ id, iddetail }) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data, isLoading, isError, error } = useFetchDA(id, iddetail);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        if (error.response?.data?.status === 404) {
            console.log(error);
            notFound();
        } else {
            return <div>Error: {error.message}</div>
        }
    }

    return (
        <>
            <div className="mt-8 hidden items-center justify-end gap-5 sm:flex md:flex-row">
                <Button className="btn bg-white text-black">
                    <LocalPrintshopOutlinedIcon /> Cetak QR Code
                </Button>
            </div>
            <div className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <div className="w-full rounded-xl bg-white p-5">
                    <div className="dropdown mb-2 sm:hidden">
                        <div tabIndex={0} role="button">
                            <MoreHorizIcon />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content z-[1] w-72 space-y-2 rounded-box bg-base-100 p-2 shadow"
                        >
                            <li>
                                <button className="btn bg-white text-black">
                                    <LocalPrintshopOutlinedIcon /> Cetak QR Code
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="flex w-full flex-row gap-8">
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
                                {data?.aset?.nama_barang}
                            </h1>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Merk</h3>
                                <p className="text-gray-400">{data?.aset?.merk}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Kode Barang</h3>
                                <p className="text-gray-400">{data?.kode_barang}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Ruangan</h3>
                                <p className="text-gray-400">{data?.ruangan?.nama_ruangan}</p>
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Status</h3>
                                <p className="text-gray-400">{data?.status}</p>
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
                    <div className="mt-4 flex flex-row justify-between">
                        <div className="w-[50%] space-y-2">
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Nomor Rangka</h3>
                                {data?.nomor_rangka ? (
                                    <p className="text-gray-400">{data?.nomor_rangka}</p>
                                ) : (
                                    "-"
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Nomor Mesin</h3>
                                {data?.nomor_mesin ? (
                                    <p className="text-gray-400">{data?.nomor_mesin}</p>
                                ) : (
                                    "-"
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Nomor Polisi</h3>
                                {data?.nomor_polisi ? (
                                    <p className="text-gray-400">{data?.nomor_polisi}</p>
                                ) : (
                                    "-"
                                )}
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium">Nomor bpkb</h3>
                                {data?.nomor_bpkb ? (
                                    <p className="text-gray-400">{data?.nomor_bpkb}</p>
                                ) : (
                                    "-"
                                )}
                            </div>
                        </div>
                        <div className="w-[50%]">
                            <Image
                                alt="qrcode"
                                src={qrcode}
                                className="w-full rounded-lg object-cover"
                                priority
                            />
                        </div>
                    </div>
                    <h3 className="mt-4 text-lg font-medium">Keterangan</h3>
                    <p className="text-gray-400">
                        {data?.keterangan ? data?.keterangan : "-"}
                    </p>
                </div>
                <div className="space-y-5">
                    <div className="rounded-xl bg-white p-5">
                        <h2 className="text-lg font-medium">Penanggung Jawab</h2>
                        {data?.Penanggung_Jawab?.length > 0 ? (
                            <div className=" flex gap-2 mt-4">
                                {data?.Penanggung_Jawab?.map((pj, index) => {
                                    return (
                                        <Tooltip showArrow placement="bottom" key={index} delay={1000}
                                            content={
                                                <div className="space-y-2 p-5 min-h-[121px] w-[360px]">
                                                    <div className="avatar">
                                                        <div className="w-16 rounded-full">
                                                            <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pj.image}`} />
                                                        </div>
                                                    </div>
                                                    <p className="text-md font-semibold">{pj.nama}</p>
                                                    <p className="text-xs font-medium text-gray-500">{pj.nip}</p>
                                                    <p className="text-xs font-medium text-gray-500">{pj.role}</p>
                                                    <p className="text-xs font-medium text-gray-500">{pj.no_hp}</p>
                                                    <p className="text-xs font-medium text-gray-500">{pj.alamat}</p>
                                                </div>
                                            }
                                        >
                                            <div className="avatar">
                                                <div className="w-16 rounded-full">
                                                    <img src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${pj.image}`} />
                                                </div>
                                            </div>
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        ) : (
                            <p>Belum ada Penanggung Jawab</p>
                        )}
                    </div>
                    <div className="space-y-2 rounded-xl bg-white p-5">
                        <h2 className="text-lg font-medium">Riwayat Laporan kerusakan</h2>
                        {data?.Penanggung_Jawab?.length > 0 ? (

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
                    <div className="space-y-2 rounded-xl bg-white p-5">
                        <h2 className="text-lg font-medium">Riwayat Laporan Perbaikan</h2>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">SSD Rusak</p>
                                <p className="text-sm text-gray-500">12/01/2024</p>
                            </div>
                            <div>
                                <Link
                                    href={"/admin/laporan_perbaikan/123"}
                                    className="btn btn-sm bg-white"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Kipas rusak, ganti thermal paste, dan pembersihan motherboard
                                </p>
                                <p className="text-sm text-gray-500">12/01/2024</p>
                            </div>
                            <div>
                                <Link
                                    href={"/admin/laporan_perbaikan/123"}
                                    className="btn btn-sm bg-white"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">
                                    Kipas rusak, ganti thermal paste, dan pembersihan motherboard
                                </p>
                                <p className="text-sm text-gray-500">12/01/2024</p>
                            </div>
                            <div>
                                <Link
                                    href={"/admin/laporan_perbaikan/123"}
                                    className="btn btn-sm bg-white"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailAsetIdDetail;

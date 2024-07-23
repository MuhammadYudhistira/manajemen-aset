"use client"

import LocalPrintshopOutlinedIcon from "@mui/icons-material/LocalPrintshopOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { useFetchDetailDR } from "@/hooks/damage/useFetchDetailDR";
import {
    Button,
    Spinner,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = ({ params }) => {

    const { data: damage, isLoading } = useFetchDetailDR(params.id)

    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    return (
        <>
            <Modal
                isOpen={isOpen1}
                onOpenChange={onOpenChange1}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size="xl"
            >
                <ModalContent className="p-5">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row gap-1 text-blue-500">
                                <InfoOutlinedIcon />
                                <p className="text-blue-500">APPROVAL</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Apakah anda yakin akan menyetujui laporan ini?</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-blue-500 text-white"
                                    // onClick={handleClick}
                                    onPress={onClose}
                                >
                                    Setuju
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpen2}
                onOpenChange={onOpenChange2}
                isDismissable={false}
                isKeyboardDismissDisabled={true}
                size="xl"
            >
                <ModalContent className="p-5">
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-row gap-1 text-red-500">
                                <WarningAmberOutlinedIcon />
                                <p>Warning</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Berikan keterangan kenapa anda menolak laporan ini!</p>
                                <textarea type="text" placeholder="Type here" className="input textarea input-bordered w-full min-h-20" />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-red-500 text-white"
                                    // onClick={handleClick}
                                    onPress={onClose}
                                >
                                    Tolak
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
            <div className="mt-8 hidden items-center justify-end gap-5 sm:flex md:flex-row">
                <Button className="btn bg-white text-black border border-black">
                    <LocalPrintshopOutlinedIcon /> Cetak Laporan
                </Button>
                <Button onPress={onOpen1} className="btn bg-white text-black border border-black">
                    <CheckOutlinedIcon /> Setuju
                </Button>
                <Button onPress={onOpen2} className="btn bg-white text-black border border-black">
                    <CloseOutlinedIcon /> Tolak
                </Button>
            </div>
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
                            <span className="label-text">Dilaporkan Oleh</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Nama Aset"
                            name="nama"
                            className="input bg-blue-50 text-sm text-black"
                            value={damage?.user.nama}
                            disabled
                        />
                    </label>
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
                            className="input textarea bg-blue-50 text-sm text-black"
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
                            className="input textarea bg-blue-50 text-sm text-black"
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
                                    priority
                                    className="rounded-lg w-auto h-auto" />
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

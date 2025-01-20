"use client"
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
    useDisclosure,
    Breadcrumbs,
    BreadcrumbItem
} from "@nextui-org/react";
import moment from "moment";
import Image from "next/image";
import React, { useRef } from "react";
import { useFormik } from "formik";
import { useRejectDamageReport } from "@/hooks/damage/useRejectDamageReport";
import { toast } from "sonner";
import { useAcceptDamageReport } from "@/hooks/damage/useAcceptDamageReport";
import DamageReport from "@/components/(reports)/DamageReport";
import ButtonLaporan from "@/components/(button)/ButtonLaporan";

const page = ({ params }) => {

    const contentRef = useRef();

    const { data: damage, isLoading, refetch } = useFetchDetailDR(params.id)


    const { mutate: acceptDamage, isSuccess: acceptSuccess } = useAcceptDamageReport({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Berhasil menyetujui laporan")
        }
    })

    const { mutate: rejectDamage, isSuccess: rejectSuccess } = useRejectDamageReport({
        onError: (error) => {
            console.log(error)
        },
        onSuccess: () => {
            toast.success("Berhasil menolak laporan")
        }
    })

    const { isOpen: isOpen1, onOpen: onOpen1, onOpenChange: onOpenChange1 } = useDisclosure();
    const { isOpen: isOpen2, onOpen: onOpen2, onOpenChange: onOpenChange2 } = useDisclosure();

    const formik = useFormik({
        initialValues: {
            keterangan: "",
        },
        onSubmit: () => {
            const { keterangan } = formik.values;
            rejectDamage({ id: params.id, keterangan })
        },
    });

    const handleAcceptClick = () => {
        acceptDamage(params.id)
    }

    if (isLoading) {
        return (
            <div className="flex justify-center">
                <Spinner />
            </div>
        )
    }

    if (rejectSuccess || acceptSuccess) {
        refetch()
    }

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

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
                                    onPress={handleAcceptClick}
                                    onClick={onClose}
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
                        <form onSubmit={formik.handleSubmit}>
                            <ModalHeader className="flex flex-row gap-1 text-red-500">
                                <WarningAmberOutlinedIcon />
                                <p>Warning</p>
                            </ModalHeader>
                            <ModalBody>
                                <p>Berikan keterangan kenapa anda menolak laporan ini!</p>
                                <textarea
                                    type="text"
                                    placeholder="Type here"
                                    name="keterangan"
                                    onChange={handleFormInput}
                                    className="input textarea input-bordered w-full min-h-20" required />
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-red-500 text-white"
                                    type="submit"
                                    onPress={onClose}
                                >
                                    Tolak
                                </Button>
                            </ModalFooter>
                        </form>
                    )}
                </ModalContent>
            </Modal>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="rounded-md font-medium w-full md:max-w-max bg-white">
                    <Breadcrumbs variant="bordered" radius="sm">
                        <BreadcrumbItem href="/head">Home</BreadcrumbItem>
                        <BreadcrumbItem href="/head/laporan_kerusakan">Laporan Kerusakan</BreadcrumbItem>
                        <BreadcrumbItem>Detail Laporan Kerusakan</BreadcrumbItem>
                    </Breadcrumbs>
                </div>
                <div className="flex justify-end gap-3 items-center bg-white py-2 px-4 rounded-lg border border-black w-full md:max-w-max">
                    <p className="text-sm">Di Buat Tanggal: {moment(damage?.createdAt).format("DD-MM-YYYY")}</p>
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
            </div>
            <div className="mt-8 items-center justify-end gap-3 flex flex-col md:flex-row">
                {damage.status === "Rejected" && (
                    <Button onPress={onOpen1} className="btn bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white w-full md:w-auto">
                        <CheckOutlinedIcon /> Setuju
                    </Button>
                )}
                {damage.status === "Approved" && (
                    <Button onPress={onOpen2} className="btn bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white w-full md:w-auto">
                        <CloseOutlinedIcon /> Tolak
                    </Button>
                )}
                {damage.status === "Reported" && (
                    <>
                        <Button onPress={onOpen1} className="btn bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-500 hover:text-white w-full md:w-auto">
                            <CheckOutlinedIcon /> Setuju
                        </Button>
                        <Button onPress={onOpen2} className="btn bg-red-50 text-red-600 border border-red-200 hover:bg-red-500 hover:text-white w-full md:w-auto">
                            <CloseOutlinedIcon /> Tolak
                        </Button>
                    </>
                )}
                <ButtonLaporan contentRef={contentRef} nama_barang={damage?.detail_aset?.aset?.nama_barang} />
            </div>
            <DamageReport
                nama={damage.user?.nama}
                createdAt={damage.createdAt}
                deskripsi_kerusakan={damage.deskripsi}
                perihal={damage.perihal}
                nama_barang={damage?.detail_aset?.aset?.nama_barang}
                ruangan={damage?.detail_aset?.lokasi?.nama_lokasi}
                ref={contentRef}
            />
            {
                damage.image ? (
                    <div className='rounded-xl bg-white p-5 mt-5 border'>
                        <div className="space-y-2">
                            <span className="label-text">Bukti Kerusakan</span>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${damage.image}`}
                                width={400}
                                height={400}
                                alt="gambar kerusakan"
                                className="rounded-lg" />
                        </div>
                    </div>
                ) : null
            }
            {damage.status === "Rejected" && (
                <div className="bg-white rounded-xl p-5 space-y-4">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-red-500 font-semibold">Keterangan</span>
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

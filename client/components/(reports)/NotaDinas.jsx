"use client"
import {
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@nextui-org/react";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import React, { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import { formatRupiah } from '@/libs/formatRupiah';
import moment from 'moment';
import 'moment/locale/id';
import { useFormik } from "formik";
import useSession from "@/hooks/session/useSession";
import { useAcceptRepair } from "@/hooks/repair/useAcceptRepair";
import { useRejectRepair } from "@/hooks/repair/useRejectRepair";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const NotaDinas = ({ deskripsi_kerusakan, biaya_perbaikan, no_rekening, perihal, createdAt, hal, tanggal_laporan, nama, nip, id }) => {
    const contentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => contentRef.current,
        documentTitle: 'Nota Dinas',
        //add custom styles for printing
        onBeforeGetContent: () => {
            const style = document.createElement('style');
            style.innerHTML = `
                @page {
                    size: A4;
                }
                @media print {
                    body {
                        -webkit-print-color-adjust: exact;
                    }
                    .print-container {
                        padding: 20mm;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    });

    const { session, loading } = useSession()

    const { mutate: acceptRepair, isSuccess: acceptSuccess } = useAcceptRepair({
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        },
        onSuccess: () => {
            toast.success("Berhasil menyetujui laporan")
        }
    })

    const { mutate: rejectRepiar, isSuccess: rejectSuccess } = useRejectRepair({
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
            rejectRepiar({ id, keterangan })
        },
    });

    const handleAcceptClick = () => {
        acceptRepair(id)
    }

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    if (rejectSuccess || acceptSuccess) {
        redirect("/sekwan/laporan_perbaikan")
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
                                    onPress={handleAcceptClick}
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
            <div className="mt-8 items-center justify-end gap-3 flex flex-col md:flex-row">
                <Button className="btn bg-white text-black border border-black w-full md:w-auto" onClick={handlePrint}>
                    <PictureAsPdfOutlinedIcon /> Export PDF
                </Button>
                {session?.role === "SEKWAN" && (
                    <>
                        <Button onPress={onOpen1} className="btn bg-white text-black border border-black w-full md:w-auto">
                            <CheckOutlinedIcon /> Setuju
                        </Button>
                        <Button onPress={onOpen2} className="btn bg-white text-black border border-black w-full md:w-auto">
                            <CloseOutlinedIcon /> Tolak
                        </Button>
                    </>
                )}
            </div>
            <div className='rounded-xl bg-white p-5 mt-5 border'>
                <div ref={contentRef} className='p-5 space-y-5 print-container'>
                    <h1 className='font-bold text-center text-xl underline font-serif'>NOTA DINAS</h1>
                    <table className='text-left uppercase font-serif font-light w-full border-b-4 border-black border-double mb-4'>
                        <tbody>
                            <tr>
                                <td className='w-[10%]'>Kepada</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>Yth. Bapaka Sekretaris DPRD Provinsi Sumatera Barat</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Dari</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>Kepala Bagian Umum dan Keuangan Set. DPRD Sumbar</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Tanggal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{moment(createdAt).format("DD MMMM YYYY")}</td>
                            </tr>
                            <tr>
                                <td className='w-[10%]'>Hal</td>
                                <td className='w-[3%] pl-2'>:</td>
                                <td className='w-[88%]'>{hal}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>Dengan Hormat,</p>
                    <ol className='pl-10 list-decimal list-outside space-y-4'>
                        <li>Dengan ini disampaikan kepada Bapak, bahwa sesuai dengan laporan staf subbag rumah tangga Sekretariat DPRD Prov. Sumbar tanggal {moment(tanggal_laporan).format("DD MMMM YYYY")} Perihal {perihal}</li>
                        <li>{deskripsi_kerusakan} dengan biaya yang dibutuhkan sebesar <strong>{formatRupiah(biaya_perbaikan)}</strong></li>
                        <li>Untuk biaya diatas dibebankan pada kegiatan Penyediaan jasa penunjang Urusan Pemerintah Provinsi, dengan No Rekening <strong>{no_rekening}</strong></li>
                        <li>Demikian disampaikan dan selanjutnya mohon persetujuan Bapak, terimakasih.</li>
                    </ol>
                    <div className='flex justify-end uppercase'>
                        <div>
                            <h4 className='text-center'>Kepala bagian umum dan keuangan</h4>
                            <h4 className='text-center'>Sekretariat DPRD Prov. Sumbar</h4>
                            <br /><br /> <br />
                            <p className='text-center underline'>{nama}</p>
                            <p className='text-center'>NIP. {nip}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotaDinas;

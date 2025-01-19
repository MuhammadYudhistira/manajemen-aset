"use client"
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Spinner,
} from "@nextui-org/react";
import Image from 'next/image'
import React, { useState } from 'react'
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import { useDeleteCustodian } from "@/hooks/penanggung_jawab/useDeleteCustodian";
import { toast } from "sonner";
import { useFetchUserWhoseCustodian } from "@/hooks/penanggung_jawab/useFetchUserWhoseCustodian";

const CardPJ = ({
    profile,
    nama,
    nip,
    asets
}) => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedId, setSelectedId] = useState();
    const { refetch } = useFetchUserWhoseCustodian()


    const { mutate: deletePJ, isPending } = useDeleteCustodian({
        onSuccess: () => {
            toast.info("berhasil menghapus data penanggung jawab");
            refetch();
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message);
        },
    });

    const handleClick = () => {
        deletePJ(selectedId)
    };

    return (
        <div className="group rounded-lg border bg-white p-5">
            <div className='flex gap-3'>
                <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile}`}
                    width={500}
                    height={500}
                    alt={nama}
                    priority
                    className="size-[50px] rounded-full object-cover object-center"
                />
                <div>
                    <h3 className="text-justify text-xl font-medium text-gray-900">
                        {nama}
                    </h3>
                    <p className="flex w-full justify-between text-xs font-medium text-gray-500">
                        NIP: {nip}
                    </p>
                </div>
            </div>
            <div className='mt-6 space-y-2 max-h-[290px] overflow-y-auto p-1 scrollbar-hide'>
                <h4 className='font-medium'>Assigned Assets:</h4>
                {asets?.map((aset) => {
                    return (
                        <div className='flex justify-between gap-3 bg-gray-200 p-2 rounded-lg overflow-auto' key={aset.id}>
                            <div className='flex gap-3'>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${aset.detail_aset?.Detail_Aset_Images[0]?.link}`}
                                    width={500}
                                    height={500}
                                    alt={aset.detail_aset.aset.nama_barang}
                                    priority
                                    className="size-[50px] rounded-lg object-cover object-center"
                                />
                                <div>
                                    <h3 className="text-left font-medium text-gray-900">
                                        {aset.detail_aset.aset.nama_barang}
                                    </h3>
                                    <p className="flex w-full justify-between text-xs font-medium text-gray-500">
                                        Kode Aset: {aset.detail_aset.kode_barang}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onPress={onOpen}
                                onClick={() => { setSelectedId(aset.id) }}
                                className="btn bg-transparent text-red-500 border-0 shadow-none"
                                size='sm'>
                                <DeleteOutlineOutlinedIcon className='size-5' />
                            </Button>
                        </div>
                    )
                })}
            </div>

            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
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
                                <p>Apakah anda yakin akan menghapus data user ini??</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button
                                    className="bg-red-500 text-white"
                                    onClick={handleClick}
                                    onPress={onClose}
                                >
                                    {isPending ? <Spinner /> : "Delete"}
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    )
}

export default CardPJ
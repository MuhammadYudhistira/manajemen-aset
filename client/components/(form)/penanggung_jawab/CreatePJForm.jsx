"use client"
import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useFormik } from 'formik';
import { useFetchUser } from '@/hooks/user/useFetchUser';

const CreatePJForm = () => {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: users, isLoading } = useFetchUser()

    const formik = useFormik({
        initialValues: {
            id_user: "",
            id_detail_aset: ""
        },
        onSubmit: () => {
            console.log(formik.values);
            const { id_user, id_detail_aset } = formik.values;
        },
    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <>
            <Button onPress={onOpen} className="btn bg-white text-black"><AddCircleOutlineOutlinedIcon /> Tambah Penanggung Jawab</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='2xl'>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <form onSubmit={formik.handleSubmit}>
                                <ModalHeader className="flex flex-col gap-1">Tambah Penanggung Jawab</ModalHeader>
                                <ModalBody>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Nama Pengguna</span>
                                        </div>
                                        <select className="select bg-blue-50 text-sm" name='id_user' onChange={handleFormInput}>
                                            <option defaultValue={""} hidden>Nama Pengguna</option>
                                            {users.map((user) => {
                                                return (
                                                    <option value={user.id} key={user.id}>{user.nama}</option>
                                                )
                                            })}
                                        </select>
                                    </label>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" type='submit' onPress={onClose}>
                                        Action
                                    </Button>
                                </ModalFooter>
                            </form>
                        </>
                    )}
                </ModalContent>
            </Modal >
        </>
    )
}

export default CreatePJForm
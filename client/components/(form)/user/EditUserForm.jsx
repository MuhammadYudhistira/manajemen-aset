"use client"
import Dropzone from '@/components/(input)/Dropzone';
import { useEditUser } from '@/hooks/user/useEditUser';
import { useFetchDetailUser } from '@/hooks/user/useFetchDetailUser';
import axios from '@/libs/axios';
import { Spinner } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { useFormik } from 'formik';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

const EditUserForm = ({ id }) => {
    const { data: user, isLoading } = useFetchDetailUser(id)
    const { mutate: editUser, isPending, isSuccess } = useEditUser({
        onSuccess: () => {
            toast.success("Berhasil mengupdate data user")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        }
    })

    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] }

    const formik = useFormik({
        initialValues: {
            nama: user.nama || "",
            nip: user.nip || "",
            password: user.password || "",
            alamat: user.alamat || "",
            jenis_kelamin: user.jenis_kelamin || "",
            no_hp: user.no_hp || "",
            role: user.role || ""
        },
        enableReinitialize: true,
        onSubmit: () => {
            const { nama, alamat, jenis_kelamin, nip, no_hp, password, role } = formik.values
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('alamat', alamat)
            formData.append('jenis_kelamin', jenis_kelamin)
            formData.append('nip', nip)
            formData.append('no_hp', no_hp)
            formData.append('password', password)
            formData.append('role', role)
            for (let i = 0; i < image.length; i++) {
                formData.append('image', image[i]);
            }

            editUser({ id, body: formData })
        }

    })
    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    if (isLoading) {
        return <Spinner />
    }

    if (isSuccess) {
        redirect("/admin/user")
    }

    return (
        <form className='w-full space-y-2' onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nama Lengkap</span>
                </div>
                <input type="text" placeholder="Nama Lengkap" name='nama' value={formik.values.nama} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">NIP</span>
                </div>
                <input type="text" placeholder="NIP" name='nip' value={formik.values.nip} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="text" placeholder="Password" name='password' onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Jenis Kelamin</span>
                </div>
                <select className="select bg-blue-50 text-sm" name='jenis_kelamin' value={formik.values.jenis_kelamin} onChange={handleFormInput} >
                    <option defaultValue={""} hidden>Jenis Kelamin</option>
                    <option value={"Pria"}>Pria</option>
                    <option value={"Wanita"}>Wanita</option>
                </select>
            </label>
            <div className="label flex flex-col justify-start items-start gap-3">
                <span className="label-text">Foto Profil</span>
                {user.image ? (
                    <div className='relative rounded-md shadow-lg w-[150px] mb-2'>
                        <Image
                            alt={user?.nama || "aset"}
                            src={`https://storage.googleapis.com/manajemen-aset/${user?.image}`}
                            width={150}
                            height={150}
                            priority
                            className="w-auto h-auto rounded-lg object-cover object-top"
                        />
                    </div>
                ) : null}
            </div>
            <Dropzone files={image} setFiles={setImage} maxFiles={1} accept={fileAccept} />
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Alamat</span>
                </div>
                <input type="text" placeholder="Alamat" name='alamat' value={formik.values.alamat} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nomor Hp</span>
                </div>
                <input type="text" placeholder="Nomor Hp" name='no_hp' value={formik.values.no_hp} onChange={handleFormInput} className="input bg-blue-50 text-black text-sm" />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Role</span>
                </div>
                <select className="select bg-blue-50 text-sm" name='role' value={formik.values.role} onChange={handleFormInput}>
                    <option defaultValue={""} hidden>Role</option>
                    <option value={"ADMIN"}>Admin</option>
                    <option value={"SEKWAN"}>Sekretaris</option>
                    <option value={"KEPALA_BAGIAN"}>Kepala Bagian</option>
                    <option value={"STAFF"}>Staff</option>
                </select>
            </label>
            <div className="flex justify-end">
                <button type='submit' className="btn mt-4 bg-black text-white hover:bg-white hover:text-black hover:border-black">{isPending ? <Spinner /> : "Edit User"}</button>
            </div>
        </form>
    )
}

export default EditUserForm
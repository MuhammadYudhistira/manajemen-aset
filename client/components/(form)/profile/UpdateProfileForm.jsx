"use client"
import Dropzone from '@/components/(input)/Dropzone';
import { useFetchMe } from '@/hooks/auth/useFetchMe';
import { useEditUser } from '@/hooks/user/useEditUser';
import { Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UpdateProfileForm = () => {

    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };
    const { data: user, refetch } = useFetchMe({
        throwOnError: (error) => {
            console.log(error);
            toast.error(error.response.data.message)
        },
    })

    const {
        mutate: editUser,
        isPending,
    } = useEditUser({
        onSuccess: () => {
            toast.success("Berhasil mengupdate data user");
            refetch()
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            nama: user?.nama || "",
            nip: user?.nip || "",
            alamat: user?.alamat || "",
            jenis_kelamin: user?.jenis_kelamin || "",
            no_hp: user?.no_hp || "",
        },
        enableReinitialize: true,
        onSubmit: () => {
            const { nama, alamat, jenis_kelamin, nip, no_hp, password, role } =
                formik.values;
            const formData = new FormData();
            formData.append("nama", nama);
            formData.append("alamat", alamat);
            formData.append("jenis_kelamin", jenis_kelamin);
            formData.append("nip", nip);
            formData.append("no_hp", no_hp);
            for (let i = 0; i < image.length; i++) {
                formData.append("image", image[i]);
            }
            editUser({ nip: user.nip, body: formData });
            setImage([])

        },
    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <form className='bg-white p-5 rounded-lg border space-y-2' onSubmit={formik.handleSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nama Lengkap</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Nama Lengkap"
                        name="nama"
                        value={formik.values.nama}
                        onChange={handleFormInput}
                        className="input bg-blue-50 text-sm text-black"
                        required
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">NIP</span>
                    </div>
                    <input
                        type="text"
                        placeholder="NIP"
                        name="nip"
                        value={formik.values.nip}
                        onChange={handleFormInput}
                        className="input bg-blue-50 text-sm text-black"
                        disabled
                    />
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Jenis Kelamin</span>
                    </div>
                    <select
                        className="select bg-blue-50 text-sm"
                        name="jenis_kelamin"
                        value={formik.values.jenis_kelamin}
                        onChange={handleFormInput}
                        required
                    >
                        <option defaultValue={""} hidden>
                            Jenis Kelamin
                        </option>
                        <option value={"Pria"}>Pria</option>
                        <option value={"Wanita"}>Wanita</option>
                    </select>
                </label>
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Nomor Hp</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Nomor Hp"
                        name="no_hp"
                        value={formik.values.no_hp}
                        onChange={handleFormInput}
                        className="input bg-blue-50 text-sm text-black"
                        required
                    />
                </label>
            </div>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Alamat</span>
                </div>
                <textarea
                    type="text"
                    placeholder="Alamat"
                    name="alamat"
                    value={formik.values.alamat}
                    onChange={handleFormInput}
                    className="input textarea bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <div className="label">
                <span className="label-text">Foto Profil</span>
            </div>
            <Dropzone
                files={image}
                setFiles={setImage}
                maxFiles={1}
                accept={fileAccept}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
                >
                    {isPending ? <Spinner /> : "Edit Data"}
                </button>
            </div>
        </form>
    )
}

export default UpdateProfileForm
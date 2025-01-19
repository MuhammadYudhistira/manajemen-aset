"use client"
import { useFetchMe } from '@/hooks/auth/useFetchMe';
import { useEditUser } from '@/hooks/user/useEditUser';
import { Spinner } from '@nextui-org/react';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { toast } from 'sonner';

const UpdatePasswordForm = () => {

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
            formik.setFieldValue('password', "")
            formik.setFieldValue('ConfirmationPassword', "")
            refetch()
        },
        onError: (error) => {
            console.log(error);
            toast.error(error.response.data.message);
        },
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            ConfirmationPassword: "",
        },
        onSubmit: () => {
            const { password, ConfirmationPassword } =
                formik.values;

            if (password !== ConfirmationPassword) {
                toast.error("Password dan Confirmation Password harus sama!")
                return
            }

            const formData = new FormData();
            formData.append("password", password);
            editUser({ nip: user.nip, body: formData });
        },
    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    return (
        <form className='bg-white p-5 rounded-lg border space-y-2' onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">New Password</span>
                </div>
                <input
                    type="password"
                    placeholder="New Password"
                    name="password"
                    value={formik.values.password}
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Confirmation Password</span>
                </div>
                <input
                    type="password"
                    placeholder="Confirmation Password"
                    name="ConfirmationPassword"
                    value={formik.values.ConfirmationPassword}
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
                >
                    {isPending ? <Spinner /> : "Edit Password"}
                </button>
            </div>
        </form>
    )
}

export default UpdatePasswordForm
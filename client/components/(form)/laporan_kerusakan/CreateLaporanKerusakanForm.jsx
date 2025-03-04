"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useCreateDamageReport } from "@/hooks/damage/useCreateDamageReport";
import { useFetchDetailDA } from "@/hooks/detail_aset/useFetchDetailDA";
import { useFetchDetailDP } from "@/hooks/detail_pengadaan/UseFetchDetailDP";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateLaporanKerusakanForm = ({ id }) => {

    const { data: aset, isLoading } = useFetchDetailDP(id)
    const { mutate: createDamageReport, isPending, isSuccess } = useCreateDamageReport({
        onSuccess: () => {
            toast.success("Berhasil menambahkan laporan kerusakan")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        }
    })


    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

    const formik = useFormik({
        initialValues: {
            kode_detail: id,
            perihal: "",
            deskripsi: "",
        },
        onSubmit: () => {
            const { perihal, deskripsi, kode_detail } = formik.values
            const formData = new FormData();
            formData.append("kode_detail", kode_detail);
            formData.append("perihal", perihal);
            formData.append("deskripsi", deskripsi);
            for (let i = 0; i < image.length; i++) {
                formData.append("image", image[i]);
            }

            createDamageReport(formData)
        },
    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    if (isLoading) {
        return <div className="flex justify-center">
            <Spinner />
        </div>
    }

    if (isSuccess) {
        redirect("/staff/laporan")
    }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nama Aset</span>
                </div>
                <input
                    type="text"
                    placeholder="Nama Aset"
                    name="nama"
                    className="input bg-blue-50 text-sm text-black"
                    value={`${aset?.barang?.nama_barang} (${aset?.id})`}
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
                    onChange={handleFormInput}
                    className="input textarea bg-blue-50 text-sm text-black"
                    required
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
                    onChange={handleFormInput}
                    className="input textarea bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <div className="label">
                <span className="label-text">Bukti Kerusakan</span>
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
                    {isPending ? <Spinner /> : "Buat Laporan Kerusakan"}
                </button>
            </div>
        </form>
    );
};

export default CreateLaporanKerusakanForm;

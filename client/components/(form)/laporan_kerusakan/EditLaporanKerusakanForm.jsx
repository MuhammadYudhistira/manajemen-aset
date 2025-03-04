"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useEditDamageReport } from "@/hooks/damage/useEditDamgeReport";
import { useFetchDetailDR } from "@/hooks/damage/useFetchDetailDR";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import moment from "moment";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const EditLaporanKerusakanForm = ({ id }) => {

    const { data: damage, isLoading } = useFetchDetailDR(id)
    const { mutate: editDamageReport, isPending, isSuccess } = useEditDamageReport({
        onSuccess: () => {
            toast.success("Berhasil mengupdate data")
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
            perihal: damage?.perihal || "",
            deskripsi: damage?.deskripsi || "",
        },
        enableReinitialize: true,
        onSubmit: () => {
            const { perihal, deskripsi, id_detail_aset } = formik.values
            const formData = new FormData();
            formData.append("id_detail_aset", id_detail_aset);
            formData.append("perihal", perihal);
            formData.append("deskripsi", deskripsi);

            if (damage.status === "Rejected") {
                formData.append("status", "Reported")
            }
            for (let i = 0; i < image.length; i++) {
                formData.append("image", image[i]);
            }
            editDamageReport({ id: id, body: formData })
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
        <>
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
                        value={`${damage?.detail_pengadaan?.barang?.nama_barang} (${damage?.detail_pengadaan?.id})`}
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
                        value={formik.values.perihal}
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
                        value={formik.values.deskripsi}
                        onChange={handleFormInput}
                        className="input textarea bg-blue-50 text-sm text-black"
                        required
                    />
                </label>
                <div className="space-y-4 pb-4">
                    <span className="label-text">Bukti Kerusakan</span>
                    {damage.image ? (
                        <div className="relative rounded-md shadow-lg max-w-max">
                            <Image
                                alt={damage?.detail_pengadaan?.id || "bukti kerusakan"}
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${damage?.image}`}
                                width={150}
                                height={150}
                                priority
                                className="w-auto rounded-lg object-cover object-top"
                            />
                        </div>
                    ) : null}
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
                        {isPending ? <Spinner /> : "Edit Laporan Kerusakan"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default EditLaporanKerusakanForm;

"use client";
import Dropzone from "@/components/(input)/Dropzone";
import { useCreateDamageReport } from "@/hooks/damage/useCreateDamageReport";
import { useFetchDamage } from "@/hooks/damage/useFetchDamage";
import { useFetchDetailDA } from "@/hooks/detail_aset/useFetchDetailDA";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreateLaporanPerbaikanForm = () => {

    const { data: damages } = useFetchDamage()

    const approvedDamages = damages?.filter(damage => damage.status === 'Approved');

    // const { mutate: createDamageReport, isPending, isError, isSuccess } = useCreateDamageReport({
    //     onSuccess: () => {
    //         toast.success("Berhasil menambahkan laporan kerusakan")
    //     },
    //     onError: (error) => {
    //         console.log(error)
    //         toast.error(error.response.data.message)
    //     }
    // })

    const formik = useFormik({
        initialValues: {
            id_laporan_kerusakan: "",
            hal: "",
            biaya_perbaikan: "",
            nomor_rekening: "",
        },
        onSubmit: () => {
            const { id_laporan_keruskan, biaya_perbaikan, hal, nomor_rekening } = formik.values

            // createDamageReport(formData)
        },
    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    // if (isLoading) {
    //     return <div className="flex justify-center">
    //         <Spinner />
    //     </div>
    // }

    // if (isSuccess) {
    //     redirect("/head/laporan_perbaikan")
    // }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Laporan Kerusakan</span>
                </div>
                <select
                    className="select bg-blue-50 text-sm"
                    name="id_laporan_kerusakan"
                    onChange={handleFormInput}
                >
                    <option defaultValue={""} hidden>
                        Pilih Laporan Kerusakan
                    </option>
                    {approvedDamages?.map((damage) => {
                        return (
                            <option value={damage.id} key={damage.id}>
                                {damage.perihal} ({damage.detail_aset.aset.nama_barang} - {damage.detail_aset.kode_barang})
                            </option>
                        );
                    })}
                </select>
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Hal</span>
                </div>
                <textarea
                    type="text"
                    placeholder="Hal"
                    name="hal"
                    onChange={handleFormInput}
                    className="input textarea bg-blue-50 text-sm text-black min-h-20"
                    required
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Biaya Perbaikan</span>
                </div>
                <input
                    type="number"
                    placeholder="Biaya Perbaikan"
                    name="biaya_perbaikan"
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Nomor Rekening</span>
                </div>
                <input
                    type="text"
                    placeholder="Nomor Rekening"
                    name="nomor_rekening"
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
                    {/* {isPending ? <Spinner /> : "Buat Laporan Kerusakan"} */}
                    Buat Laporan Perbaikan
                </button>
            </div>
        </form>
    );
};

export default CreateLaporanPerbaikanForm;

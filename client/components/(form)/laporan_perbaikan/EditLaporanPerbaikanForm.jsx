"use client";
import { useEditRepair } from "@/hooks/repair/useEditRepair";
import { useFetchDetailRepair } from "@/hooks/repair/useFetchDetailRepair";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const EditLaporanPerbaikanForm = ({ id }) => {

    const { data: repair, isLoading: repairLoading } = useFetchDetailRepair(id)

    const { mutate: editRepair, isPending, isSuccess } = useEditRepair({
        onSuccess: () => {
            toast.success("Berhasil menambahkan laporan kerusakan")
        },
        onError: (error) => {
            console.log(error)
            toast.error(error.response.data.message)
        }
    })

    const formik = useFormik({
        initialValues: {
            id_laporan_kerusakan: repair?.id_laporan_kerusakan || "",
            hal: repair?.hal || "",
            biaya_perbaikan: repair?.biaya_perbaikan || "",
            nomor_rekening: repair?.nomor_rekening || "",
            status: repair?.status || ""
        },
        enableReinitialize: true,
        onSubmit: () => {
            let valuesToSubmit = { ...formik.values };

            if (repair.status === "Rejected") {
                valuesToSubmit.status = "Reported";
            }

            console.log(valuesToSubmit);
            editRepair({ id: id, body: valuesToSubmit });
        },
    });


    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    if (repairLoading) {
        return <div className="flex justify-center">
            <Spinner />
        </div>
    }

    if (isSuccess) {
        redirect("/head/laporan_perbaikan")
    }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Laporan Kerusakan</span>
                </div>
                <input
                    className="input bg-blue-50 text-sm disabled:text-black"
                    name="id_laporan_kerusakan"
                    onChange={handleFormInput}
                    value={`${repair.laporan_kerusakan?.perihal} (${repair?.laporan_kerusakan?.detail_pengadaan?.barang?.nama_barang} - ${repair?.laporan_kerusakan?.detail_pengadaan?.id})`}
                    disabled
                />
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
                    value={formik.values.hal}
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
                    value={formik.values.biaya_perbaikan}
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
                    value={formik.values.nomor_rekening}
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
                    {isPending ? <Spinner /> : "Edit Laporan Perbaikan"}
                </button>
            </div>
        </form>
    );
};

export default EditLaporanPerbaikanForm;

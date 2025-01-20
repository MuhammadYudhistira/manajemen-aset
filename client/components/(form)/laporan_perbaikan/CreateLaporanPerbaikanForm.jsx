"use client";
import { useFetchDamage } from "@/hooks/damage/useFetchDamage";
import { useCreateRepair } from "@/hooks/repair/useCreateRepair";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CreateLaporanPerbaikanForm = () => {

    const router = useRouter()


    const { data: damages, isLoading } = useFetchDamage()
    const approvedAndUnrepairedDamages = damages?.filter(damage =>
        damage.status === 'Approved' && damage.Perbaikan === null
    );

    if (approvedAndUnrepairedDamages?.length === 0) {
        toast.info("Tidak ada laporan kerusakan")
        router.push("/head/laporan_perbaikan")
    }

    const { mutate: createRepair, isPending, isSuccess } = useCreateRepair({
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
            id: "",
            hal: "",
            biaya_perbaikan: "",
            nomor_rekening: "",
        },
        onSubmit: () => {
            createRepair(formik.values)
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
        redirect("/head/laporan_perbaikan")
    }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Laporan Kerusakan</span>
                </div>
                <select
                    className="select bg-blue-50 text-sm"
                    name="id"
                    onChange={handleFormInput}
                    required
                >
                    <option defaultValue={""} hidden>
                        Pilih Laporan Kerusakan
                    </option>
                    {approvedAndUnrepairedDamages?.map((damage) => {
                        return (
                            <option value={damage.id} key={damage.id}>
                                {damage.perihal} ({damage.detail_aset.aset.nama_barang} - {damage.detail_aset.kode_detail})
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
                    {isPending ? <Spinner /> : "Buat Laporan Kerusakan"}
                </button>
            </div>
        </form>
    );
};

export default CreateLaporanPerbaikanForm;

"use client";
import Dropzone from "@/components/(input)/Dropzone";
import DropzoneFile from "@/components/(input)/DropzoneFile";
import { useCreateRepairImages } from "@/hooks/repair/useCreateRepairingImage";
import { useCreateRepairReport } from "@/hooks/repair/useCreateRepairReport";
import { Spinner } from "@nextui-org/react";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const InputLaporanPerbaikanForm = ({ id }) => {
    const [image, setImage] = useState([])
    const [faktur, setFaktur] = useState([]);
    const [kuitansi, setKuitansi] = useState([]);
    const [beritaAcara, setBeritaAcara] = useState([]);
    const fileAccept = { "application/pdf": [] };
    const fileAcceptImage = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

    const { mutate: CreateRepairReport, isPending, isSuccess } = useCreateRepairReport({
        onSuccess: () => {
            toast.success("Berhasil menambahkan Laporan");
        },
        onError: (error) => {
            console.log(error.response);
            toast.error(error.response.data.error);
        },
    })

    const { mutate: CreateRepairImages, isPending: imagesPending, isSuccess: imagesSuccess } = useCreateRepairImages({
        onSuccess: () => {
            toast.success("Berhasil menambahkan Laporan");
        },
        onError: (error) => {
            console.log(error.response);
            toast.error(error.response.data.error);
        },
    })

    const formik = useFormik({
        initialValues: {
            nama: "",
            nip: "",
            password: "",
            alamat: "",
            jenis_kelamin: "",
            no_hp: "",
            role: "",
        },
        onSubmit: () => {
            // FormData untuk CreateRepairReport
            const repairReportData = new FormData();
            repairReportData.append("faktur", faktur[0]);
            repairReportData.append("kuitansi", kuitansi[0]);
            repairReportData.append("berita_acara", beritaAcara[0]);

            // FormData untuk CreateRepairImages
            const repairImagesData = new FormData();
            repairImagesData.append("id_perbaikan", id);
            for (let i = 0; i < image.length; i++) {
                repairImagesData.append("image", image[i]);
            }

            // Mengirim data ke CreateRepairReport
            CreateRepairReport({ id: id, body: repairReportData });

            // Mengirim data ke CreateRepairImages
            CreateRepairImages({ body: repairImagesData });
        },
    });

    if (isSuccess) {
        redirect(`/head/laporan_perbaikan/${id}`);
    }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <div className="label">
                <span className="label-text text-[1rem] font-medium">Bukti Perbaikan</span>
            </div>
            <Dropzone
                files={image}
                setFiles={setImage}
                maxFiles={10}
                accept={fileAcceptImage}
            />
            <div className="label">
                <span className="label-text text-[1rem] font-medium">Faktur</span>
            </div>
            <DropzoneFile
                files={faktur}
                setFiles={setFaktur}
                maxFiles={1}
                accept={fileAccept}
            />
            <div className="label">
                <span className="label-text text-[1rem] font-medium">Kuitansi</span>
            </div>
            <DropzoneFile
                files={kuitansi}
                setFiles={setKuitansi}
                maxFiles={1}
                accept={fileAccept}
            />
            <div className="label">
                <span className="label-text text-[1rem] font-medium">Berita Acara</span>
            </div>
            <DropzoneFile
                files={beritaAcara}
                setFiles={setBeritaAcara}
                maxFiles={1}
                accept={fileAccept}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
                >
                    {isPending ? <Spinner /> : "Tambah Laporan Perbaikan"}
                </button>
            </div>
        </form>
    );
};

export default InputLaporanPerbaikanForm;

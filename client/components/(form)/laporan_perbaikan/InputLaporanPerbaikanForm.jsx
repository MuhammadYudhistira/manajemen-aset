"use client";
import Dropzone from "@/components/(input)/Dropzone";
import DropzoneFile from "@/components/(input)/DropzoneFile";
import axios from "@/libs/axios";
import { Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const InputLaporanPerbaikanForm = () => {
    const [image, setImage] = useState([])
    const [faktur, setFaktur] = useState([]);
    const [kuitansi, setKuitansi] = useState([]);
    const [beritaAcara, setBeritaAcara] = useState([]);
    const fileAccept = { "application/pdf": [] };
    const fileAcceptImage = { "image/png": [], "image/jpg": [], "image/jpeg": [] };


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
            const formData = new FormData();
            formData.append("faktur", faktur[0]);
            formData.append("kuitansi", kuitansi[0]);
            formData.append("berita_acara", beritaAcara[0]);
            for (let i = 0; i < image.length; i++) {
                formData.append("image", image[i]);
            }
            let object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });
            console.log(object);
        },
    });

    // const handleFormInput = (event) => {
    //     formik.setFieldValue(event.target.name, event.target.value);
    // };

    // const {
    //     mutate: createUser,
    //     isPending,
    //     isSuccess,
    // } = useMutation({
    //     mutationFn: async (body) => {
    //         const response = await axios.post("/user", body);

    //         return response;
    //     },
    //     onSuccess: () => {
    //         toast.success("Berhasil menambahkan User");
    //     },
    //     onError: (error) => {
    //         console.log(error.response);
    //         toast.error(error.response.data.message);
    //     },
    // });

    // if (isSuccess) {
    //     redirect("/admin/user");
    // }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <div className="label">
                <span className="label-text text-[1rem] font-medium">Bukti Perbaikan</span>
            </div>
            <Dropzone
                files={image}
                setFiles={setImage}
                maxFiles={5}
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
                    {/* {isPending ? <Spinner /> : "Tambah user"} */}
                    Tambah Laporan Perbaikan
                </button>
            </div>
        </form>
    );
};

export default InputLaporanPerbaikanForm;

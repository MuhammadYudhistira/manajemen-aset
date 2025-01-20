"use client";
import { useFetchListDA } from "@/hooks/detail_aset/useFetchListDA";
import axios from "@/libs/axios";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CreatePemusnahan = () => {
    const [image, setImage] = useState([]);
    const fileAccept = { "image/png": [], "image/jpg": [], "image/jpeg": [] };

    const { data: asets, isLoading } = useFetchListDA()

    const filteredAssets = asets?.filter(asset => asset.status !== 'Request_Deletion' && asset.status !== 'Deletion_Accepted');

    const [selectedKeys, setSelectedKeys] = React.useState(new Set());

    // Memetakan selectedKeys (ID aset) ke format nama_barang (kode_barang)
    const selectedValues = React.useMemo(() => {
        return Array.from(selectedKeys).map((key) => {
            const selectedAset = asets.find(aset => aset.kode_detail === key); // Temukan aset berdasarkan ID
            return selectedAset ? `${selectedAset.aset.nama_barang} (${selectedAset.kode_detail})` : '';
        });
    }, [selectedKeys, asets]);

    const formik = useFormik({
        initialValues: {
            title: "",
            alasan_penghapusan: "",
        },
        onSubmit: () => {
            const { title, alasan_penghapusan } = formik.values;

            // Convert selectedKeys to array of asset IDs
            const selectedKeysArray = Array.from(selectedKeys);

            const body = {
                title,
                alasan_penghapusan,
                kode_detail: selectedKeysArray,
            };

            createDeletionRequest(body)

        },

    });

    const handleFormInput = (event) => {
        formik.setFieldValue(event.target.name, event.target.value);
    };

    const {
        mutate: createDeletionRequest,
        isPending,
        isSuccess,
    } = useMutation({
        mutationFn: async (body) => {
            const response = await axios.post("/deletion", body);
            return response;
        },
        onSuccess: () => {
            toast.success("Berhasil menambahkan Usulan Pemusnahan");
        },
        onError: (error) => {
            console.log(error.response);
            toast.error(error.response.data.message);
        },
    });

    if (isSuccess) {
        redirect("/admin/laporan_pemusnahan_aset");
    }

    return (
        <form className="w-full space-y-2" onSubmit={formik.handleSubmit}>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Title</span>
                </div>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Alasan Penghapusan</span>
                </div>
                <input
                    type="text"
                    placeholder="Alasan Penghapusan"
                    name="alasan_penghapusan"
                    onChange={handleFormInput}
                    className="input bg-blue-50 text-sm text-black"
                    required
                />
            </label>
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Pilih Aset</span>
                </div>
                <div className="space-y-4">
                    <p className="text-small text-default-500 px-1 flex flex-wrap">
                        {selectedValues.map((value, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md mr-2 mb-2 whitespace-nowrap">
                                {value}
                            </span>
                        ))}
                    </p>

                    <Listbox
                        className="border-small px-1 py-2 rounded-small max-h-[300px] overflow-y-auto"
                        aria-label="Multiple selection Assets"
                        variant="flat"
                        disallowEmptySelection
                        selectionMode="multiple"
                        selectedKeys={selectedKeys}
                        onSelectionChange={setSelectedKeys}
                    >
                        {filteredAssets?.map((aset) => (
                            <ListboxItem key={aset.kode_detail} textValue={`${aset.aset.nama_barang} (${aset.kode_detail})`}>
                                {`${aset.aset.nama_barang} (${aset.kode_detail})`}
                            </ListboxItem>
                        ))}
                    </Listbox>
                </div>
            </label>
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="btn mt-4 bg-black text-white hover:border-black hover:bg-white hover:text-black"
                >
                    {isPending ? <Spinner /> : "Tambah Usulan"}
                </button>
            </div>
        </form>
    );
};

export default CreatePemusnahan;

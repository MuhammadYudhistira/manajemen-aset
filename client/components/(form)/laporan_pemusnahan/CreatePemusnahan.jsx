"use client";
import { useFetchListDA } from "@/hooks/detail_aset/useFetchListDA";
import { useFetchListDetailPengadaan } from "@/hooks/detail_pengadaan/useFetchListDetailPengadaan";
import axios from "@/libs/axios";
import { Listbox, ListboxItem, Spinner } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CreatePemusnahan = () => {

    const { data: asets } = useFetchListDetailPengadaan()

    const filteredAssets = asets?.filter(asset => asset.status !== 'Request_Deletion' && asset.status !== 'Deletion_Accepted');

    const [selectedKeys, setSelectedKeys] = React.useState(new Set());

    // mapping selectedKeys (ID aset) ke format nama_barang (kode_barang)
    const selectedValues = React.useMemo(() => {
        return Array.from(selectedKeys).map((key) => {
            const selectedAset = asets.find(aset => aset.id === key); // Temukan aset berdasarkan ID
            return selectedAset ? `${selectedAset.barang.nama_barang} (${selectedAset.id})` : '';
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
                            <ListboxItem key={aset.id} textValue={`${aset.barang.nama_barang} (${aset.id})`}>
                                {`${aset.barang.nama_barang} (${aset.id})`}
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

"use client";
import React, { useState } from "react";
import CardAset from "@/components/(aset)/CardAset";
import SkeletonLoading from "@/components/(global)/SkeletonLoading";
import { toast } from "sonner";
import computer from "@/public/computer.jpg";
import { useFetchAsetByUser } from "@/hooks/aset/useFetchAsetByUser";

const StaffGridAset = () => {
    const [filter, setFilter] = useState('latest');
    const [search, setSearch] = useState('');
    const { data: asets, isLoading, isError } = useFetchAsetByUser();

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const filterAndSearchAssets = (assets, filter, search) => {
        if (!assets) return [];

        let filteredAssets = [...assets];

        // Filter berdasarkan nama
        if (search) {
            filteredAssets = filteredAssets.filter((aset) =>
                aset.aset.nama_barang.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Urutkan berdasarkan filter
        if (filter === 'latest') {
            filteredAssets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (filter === 'oldest') {
            filteredAssets.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        }

        return filteredAssets;
    };

    const filteredAssets = filterAndSearchAssets(asets?.listAssets, filter, search);

    if (isLoading) {
        return (
            <>
                {Array.from({ length: 8 }).map((_, index) => (
                    <SkeletonLoading key={index} />
                ))}
            </>
        );
    }

    if (isError) {
        toast.error("Server Error Coba lagi nanti");
    }

    return (
        <>
            <div className="flex w-full flex-1 flex-col gap-4 lg:flex-row">
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Nama Aset"
                    className="input input-md input-bordered w-full lg:max-w-xs"
                />
                <select
                    value={filter}
                    onChange={handleFilterChange}
                    className="select select-bordered w-full lg:max-w-xs"
                >
                    <option value="latest">Terbaru</option>
                    <option value="oldest">Terlama</option>
                </select>
            </div>
            {filteredAssets.length === 0 && <p className="text-center w-full bg-white p-20 rounded-lg border">Aset yang dicari tidak ada</p>}
            <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
                {filteredAssets.map((aset) => (
                    <CardAset
                        deskripsi={aset.deskripsi}
                        id={aset.id}
                        image={aset.Detail_Aset_Images ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${aset.Detail_Aset_Images[0]?.link}` : computer}
                        nama={`${aset.barang.nama_barang} (${aset.id})`}
                        ukuran={aset.ukuran}
                        kode={aset.id}
                        merk={aset.merk}
                        key={aset.id}
                        jenis={aset.barang.jenis_barang}
                        keterangan={aset.keterangan}
                        jumlah={null}
                        role="staff"
                    />
                ))}
            </div>
        </>
    );
};

export default StaffGridAset;


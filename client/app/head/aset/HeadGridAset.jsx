"use client";
import React, { useState } from "react";
import CardAset from "@/components/(aset)/CardAset";
import SkeletonLoading from "@/components/(global)/SkeletonLoading";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import { toast } from "sonner";
import computer from "@/public/computer.jpg";

const HeadGridAset = () => {
    const [filter, setFilter] = useState('latest');
    const [search, setSearch] = useState('');
    const { data: asets, isLoading, isError } = useFetchAset();
    console.log("🚀 ~ HeadGridAset ~ asets:", asets)

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
                aset.nama_barang.toLowerCase().includes(search.toLowerCase())
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
                        id={aset.kode_barang}
                        image={aset.image ? aset.image : computer}
                        nama={aset.nama_barang}
                        kode={aset.kode_barang}
                        ukuran={aset.jenis_barang}
                        key={aset.kode_barang}
                        role="head"
                    />
                ))}
            </div>
        </>
    );
};

export default HeadGridAset;

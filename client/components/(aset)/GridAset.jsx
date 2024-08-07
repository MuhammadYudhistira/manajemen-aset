"use client";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React, { useState } from "react";
import CardAset from "./CardAset";
import SkeletonLoading from "../(global)/SkeletonLoading";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import { toast } from "sonner";
import computer from "@/public/computer.jpg";
import Link from "next/link";

const GridAset = () => {
  const [filter, setFilter] = useState('latest');
  const [search, setSearch] = useState('');
  const { data: asets, isLoading, isError } = useFetchAset();

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
        <Link
          href="/admin/aset/create"
          className="btn ml-auto bg-white text-black"
        >
          <AddCircleOutlineOutlinedIcon /> Tambah Aset
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 py-10 sm:grid-cols-2 md:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {isLoading && (
          <>
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonLoading key={index} />
            ))}
          </>
        )}
        {filteredAssets?.map((aset) => (
          <CardAset
            deskripsi={aset.deskripsi}
            id={aset.id}
            image={aset.image ? aset.image : computer}
            nama={aset.nama_barang}
            ukuran={aset.ukuran}
            key={aset.id}
            role="admin"
          />
        ))}
      </div>
      {filteredAssets.length === 0 && <p className="text-center w-full bg-white p-20 rounded-lg border">Aset yang dicari tidak ada</p>}
    </>
  );
};

export default GridAset;

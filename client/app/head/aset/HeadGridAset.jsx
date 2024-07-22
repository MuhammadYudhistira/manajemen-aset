"use client";

import React from "react";
import CardAset from "@/components/(aset)/CardAset";
import SkeletonLoading from "@/components/(global)/SkeletonLoading";
import { useFetchAset } from "@/hooks/aset/useFetchAset";
import { toast } from "sonner";
import computer from "@/public/computer.jpg";

const HeadGridAset = () => {
    const { data: asets, isLoading, isError } = useFetchAset();

    const cards = Array.from({ length: 8 });

    if (isLoading) {
        return (
            <>
                {cards.map((_, index) => (
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
            {asets?.listAssets?.map((aset) => {
                return (
                    <CardAset
                        deskripsi={aset.deskripsi}
                        id={aset.id}
                        image={aset.image ? aset.image : computer}
                        nama={aset.nama_barang}
                        ukuran={aset.ukuran}
                        key={aset.id}
                        role={"head"}
                    />
                );
            })}
        </>
    );
};

export default HeadGridAset;

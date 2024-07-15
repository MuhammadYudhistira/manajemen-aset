"use client"
import React from "react";
import { toast } from "sonner";
import computer from "@/public/computer.jpg";
import { useFetchAsetByUser } from "@/hooks/aset/useFetchAsetByUser";
import SkeletonLoading from "@/components/(global)/SkeletonLoading";
import CardAset from "@/components/(aset)/CardAset";

const GridAsetStaff = () => {

    const { data: asets, isLoading, isError } = useFetchAsetByUser();

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
            {asets?.map((aset) => {
                return (
                    <CardAset
                        deskripsi={aset.keterangan}
                        id={aset.id}
                        image={aset.Detail_Aset_Images.length > 0 ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${aset.Detail_Aset_Images[0]?.link}` : computer}
                        nama={`${aset.aset.nama_barang} (${aset.kode_barang})`}
                        ukuran={aset.ukuran}
                        key={aset.id}
                        role={"staff"}
                    />
                );
            })}
        </>
    )
}

export default GridAsetStaff
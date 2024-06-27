"use client"

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import CardAset from './CardAset'
import { Card, Skeleton } from '@nextui-org/react'
import SkeletonLoading from '../(global)/SkeletonLoading'

const GridAset = () => {

    const { data: asets, isLoading, error } = useQuery({
        queryFn: async () => {
            const response = await axios.get("http://localhost:2000/api/aset")
            return response.data
        },
        queryKey: ["asets"]
    })

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

    return (
        <>
            {asets?.map((aset) => {
                return (
                    <CardAset deskripsi={aset.deskripsi} id={aset.id} image={aset.image}
                        nama={aset.nama_barang} ukuran={aset.ukuran} key={aset.id} />
                )
            })
            }
        </>
    )
}

export default GridAset
"use client"
import { useFetchAset } from '@/hooks/aset/useFetchAset'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import React from 'react'
import { Skeleton } from '@nextui-org/react';

const StatsAset = () => {
    const { data: aset, isLoading } = useFetchAset()

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 mb-7">
                <div className="w-full flex items-center gap-3 bg-white rounded-xl border p-6">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
                <div className="w-full flex items-center gap-3 bg-white rounded-xl border p-6">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
                <div className="w-full flex items-center gap-3 bg-white rounded-xl border p-6">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
                <div className="w-full flex items-center gap-3 bg-white rounded-xl border p-6">
                    <div>
                        <Skeleton className="flex rounded-full w-12 h-12" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Skeleton className="h-3 w-3/5 rounded-lg" />
                        <Skeleton className="h-3 w-4/5 rounded-lg" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 mb-7">
            <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                <span className="rounded-full bg-blue-50 p-3">
                    <Inventory2OutlinedIcon />
                </span>

                <div>
                    <p className="text-2xl font-medium text-gray-900">{aset?.count.all}</p>
                    <p className="text-sm text-gray-500">Jumlah Aset</p>
                </div>
            </article>
            <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                <span className="rounded-full bg-blue-50 p-3">
                    <CheckOutlinedIcon />
                </span>

                <div>
                    <p className="text-2xl font-medium text-gray-900">{aset?.count.available}</p>
                    <p className="text-sm text-gray-500">Aktif</p>
                </div>
            </article>
            <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                <span className="rounded-full bg-blue-50 p-3">
                    <CloseOutlinedIcon />
                </span>

                <div>
                    <p className="text-2xl font-medium text-gray-900">{aset?.count.inactive}</p>
                    <p className="text-sm text-gray-500">Tidak Aktif</p>
                </div>
            </article>
            <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                <span className="rounded-full bg-blue-50 p-3">
                    <BuildOutlinedIcon />
                </span>

                <div>
                    <p className="text-2xl font-medium text-gray-900">{aset?.count.repairing}</p>
                    <p className="text-sm text-gray-500">Sedang Diperbaiki</p>
                </div>
            </article>
        </div>
    )
}

export default StatsAset
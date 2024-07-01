"use client"
import React, { useMemo } from 'react'
import BasicTable from './BasicTable'
import { createColumnHelper } from '@tanstack/react-table'
import { Image } from '@nextui-org/react'

const TablePJ = () => {
    const aset = [
        {
            "nama_aset": "Laptop Asus",
            "ruangan": "Komisi 1",
            "created_at": "12 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "nama_aset": "Laptop Lenovo",
            "ruangan": "Komisi 1",
            "created_at": "13 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "nama_aset": "Laptop MSI",
            "ruangan": "Komisi 1",
            "created_at": "15 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "nama_aset": "Laptop Acer",
            "ruangan": "Komisi 1",
            "created_at": "10 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "nama_aset": "Laptop Samsung",
            "ruangan": "Komisi 1",
            "created_at": "09 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
            "nama_aset": "Macbook",
            "ruangan": "Komisi 1",
            "created_at": "21 Januari 2024",
            "pj": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=1985&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },

    ]
    const data = useMemo(() => aset, [])

    const columnHelper = createColumnHelper()

    const columns = [
        {
            header: 'Nama Aset',
            accessorKey: 'nama_aset',
        },
        {
            header: 'Ruangan',
            accessorKey: 'ruangan',
        },
        {
            header: 'Tanggal',
            accessorKey: 'created_at',
        },
        columnHelper.accessor('pj', {
            cell: url => <Image src={url.getValue()} alt="" className="size-4 md:size-8  rounded-full object-cover" />,
            header: "PJ"
        })
    ]
    return (
        <>
            <BasicTable data={data} columns={columns} />
        </>
    )
}

export default TablePJ
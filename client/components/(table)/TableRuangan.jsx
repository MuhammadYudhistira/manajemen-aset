"use client"
import React, { useMemo } from 'react'
import BasicTable from './BasicTable'
import { createColumnHelper } from '@tanstack/react-table'
import { Image } from '@nextui-org/react'

const TableRuangan = () => {
    const aset = [
        {
            "nama_ruangan": "Komisi 1",
            "created_at": "01 Januari 2024",
        },
        {
            "nama_ruangan": "Komisi 2",
            "created_at": "22 Januari 2024",
        },
        {
            "nama_ruangan": "Komisi 3",
            "created_at": "12 Januari 2024",
        },
        {
            "nama_ruangan": "Komisi 4",
            "created_at": "31 Januari 2024",
        },
        {
            "nama_ruangan": "Komisi 5",
            "created_at": "11 Januari 2024",
        },

    ]
    const data = useMemo(() => aset, [])

    const columns = [
        {
            header: 'Nama Ruangan',
            accessorKey: 'nama_ruangan',
        },
        {
            header: 'Tanggal',
            accessorKey: 'created_at',
        },
    ]
    return (
        <>
            <BasicTable data={data} columns={columns} />
        </>
    )
}

export default TableRuangan
import TableRuangan from '@/components/(table)/TableRuangan'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div className='flex gap-4 mt-8'>
                <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full justify-end">
                    <Link href={"/admin/penanggung_jawab/create"} className="btn bg-white text-black"><AddCircleOutlineOutlinedIcon /> Tambah Ruangan</Link>
                </div>
            </div>

            <div className='mt-4 p-5 rounded-xl bg-white border'>
                <TableRuangan />
            </div>
        </>
    )
}

export default page
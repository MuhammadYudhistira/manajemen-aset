import TablePJ from '@/components/(table)/TablePJ'
import React from 'react'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link';

const page = () => {
    return (
        <>
            <div className='flex gap-4 mt-8'>
                <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full justify-end">
                    <Link href={"/admin/penanggung_jawab/create"} className="btn bg-white text-black"><AddCircleOutlineOutlinedIcon /> Tambah Penanggung Jawab</Link>
                </div>
            </div>
            <div className='mt-4 p-5 rounded-xl bg-white border'>
                <TablePJ />
            </div>
        </>
    )
}

export default page
import InputLaporanPerbaikanForm from '@/components/(form)/laporan_perbaikan/InputLaporanPerbaikanForm'
import React from 'react'

const page = ({ params }) => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <InputLaporanPerbaikanForm />
            </div>
        </>
    )
}

export default page
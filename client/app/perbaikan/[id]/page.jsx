import LaporanPerbaikan from '@/components/(page)/LaporanPerbaikan'
import React from 'react'

const page = ({ params }) => {
    return (
        <>
            <LaporanPerbaikan id={params.id} />
        </>
    )
}

export default page
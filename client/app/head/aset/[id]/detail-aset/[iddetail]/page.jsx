import DetailAsetIdDetail from '@/components/(aset)/DetailAsetIdDetail'
import React from 'react'

const page = ({ params }) => {
    return (
        <>
            <DetailAsetIdDetail iddetail={params.iddetail} id={params.id} />
        </>
    )
}

export default page
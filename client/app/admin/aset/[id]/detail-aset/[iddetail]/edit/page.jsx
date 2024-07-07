import EditDetailAsetForm from '@/components/(form)/detail_aset/EditDetailAsetForm'
import React from 'react'

const page = ({ params }) => {

    return (
        <div className='p-5 bg-white rounded-xl'>
            <EditDetailAsetForm id={params.id} iddetail={params.iddetail} />
        </div>
    )
}

export default page
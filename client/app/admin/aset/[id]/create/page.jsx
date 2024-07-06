import CreateDetailAsetForm from '@/components/(form)/detail_aset/CreateDetailAsetForm'
import React from 'react'

const page = ({ params }) => {
    return (
        <div className='p-5 bg-white rounded-xl'>
            <CreateDetailAsetForm id={params.id} />
        </div>
    )
}

export default page
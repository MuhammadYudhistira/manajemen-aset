import EditAsetForm from '@/components/(form)/EditAsetForm'
import React from 'react'

const page = ({ params }) => {

    return (
        <div className='p-5 bg-white rounded-xl'>
            <EditAsetForm id={params.id} />
        </div>
    )
}

export default page
import EditUserForm from '@/components/(form)/user/EditUserForm'
import React from 'react'

const page = ({ params }) => {
    return (
        <div className='p-5 bg-white rounded-xl'>
            <EditUserForm id={params.id} />
        </div>
    )
}

export default page
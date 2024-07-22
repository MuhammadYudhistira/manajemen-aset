import DetailAset from '@/components/(aset)/DetailAset'
import React from 'react'

const page = ({ params }) => {
    return (
        <>
            <DetailAset id={params.id} />
        </>
    )
}

export default page
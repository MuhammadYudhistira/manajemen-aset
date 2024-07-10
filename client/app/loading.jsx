import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
    return (
        <div className='bg-blue-50 flex justify-center items-center w-full min-h-[100vh]'>
            <Spinner />
        </div>
    )
}

export default loading
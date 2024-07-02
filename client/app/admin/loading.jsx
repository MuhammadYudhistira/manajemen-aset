import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
    return (
        <div className='flex justify-center items-center'>
            <Spinner size='lg' />
        </div>
    )
}

export default loading
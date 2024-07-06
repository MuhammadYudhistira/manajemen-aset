import TablePJ from '@/components/(table)/TablePJ'
import React from 'react'
import CreatePJForm from '@/components/(form)/penanggung_jawab/CreatePJForm'

const page = () => {
    return (
        <>
            <div className='flex gap-4 mt-8'>
                <div className="ml-auto">
                    <CreatePJForm />
                </div>
            </div>
            <div className='mt-4 p-5 rounded-xl bg-white border'>
                <TablePJ />
            </div>
        </>
    )
}

export default page
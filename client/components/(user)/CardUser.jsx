import React from 'react'
import Image from 'next/image';
import ActionUser from './ActionUser';

const CardUser = ({ profile, nama, role, nip, alamat, jenis_kelamin, no_hp, id }) => {
    return (
        <div className="group bg-white rounded-lg border">
            <ActionUser id={id} />
            <Image src={`https://storage.googleapis.com/manajemen-aset/${profile}`} width={500} height={500} alt={nama} className='size-[100px] xl:size-[150px] rounded-full mx-auto object-cover object-center' />
            <div className="flex flex-col items-center p-5 space-y-2">
                <h3 className="text-xl font-medium text-gray-900 text-center">{nama}</h3>
                <span className="whitespace-nowrap rounded-full bg-gray-100 px-10 py-0.5 text-xs text-black text-center">
                    {role}
                </span>
                <p className='text-xs font-medium flex justify-between w-full'>NIP <span>{nip}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Alamat <span className='ml-10 flex-grow text-right'>{alamat}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Jenis Kelamin <span>{jenis_kelamin}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Nomor HP <span>{no_hp}</span></p>
            </div>
        </div>
    )
}

export default CardUser
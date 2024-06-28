import React from 'react'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CardUser = ({ profile, nama, role, nip, alamat, jenis_kelamin, no_hp }) => {
    return (
        <div className="group bg-white rounded-lg border">
            <div className="flex justify-end dropdown px-2">
                <div tabIndex={0} role="button"><MoreHorizIcon /></div>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                    <li><button className="btn bg-white text-black"><EditOutlinedIcon /> Edit Detail User</button></li>
                    <li><button className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300"><DeleteOutlineOutlinedIcon /> Delete User</button></li>
                </ul>
            </div>
            <img src={profile} alt={nama} className='size-[100px] xl:size-[150px] rounded-full mx-auto object-cover object-top' />
            <div className="flex flex-col items-center p-5 space-y-2">
                <h3 className="text-xl font-medium text-gray-900">{nama}</h3>
                <span className="whitespace-nowrap rounded-full bg-gray-100 px-10 py-0.5 text-xs text-black text-center">
                    {role}
                </span>
                <p className='text-xs font-medium flex justify-between w-full'>NIP <span>{nip}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Alamat <span>{alamat}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Jenis Kelamin <span>{jenis_kelamin}</span></p>
                <p className='text-xs font-medium flex justify-between w-full'>Nomor HP <span>{no_hp}</span></p>
            </div>
        </div>
    )
}

export default CardUser
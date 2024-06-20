import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import Link from 'next/link';

import profile from "@/public/profile.jpg"
import Image from 'next/image';


const page = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-8 mb-7">
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <GroupsOutlinedIcon className='text-3xl' />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">1.254</p>
                        <p className="text-sm text-gray-500">Jumlah User</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <AccountBoxOutlinedIcon className='text-3xl' />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">1.001</p>
                        <p className="text-sm text-gray-500">Penanggung Jawab</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <FaceOutlinedIcon className='text-3xl' />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">253</p>
                        <p className="text-sm text-gray-500">Male</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <Face3OutlinedIcon className='text-3xl' />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">956</p>
                        <p className="text-sm text-gray-500">Female</p>
                    </div>
                </article>
            </div>
            <div className='flex gap-4'>
                <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full">
                    <input type="text" placeholder="Nama User" className="input input-bordered input-md w-full lg:max-w-xs" />
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Admin</option>
                        <option>Sekretaris</option>
                        <option>Ketua Bagian</option>
                        <option>Staff</option>
                    </select>
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Terbaru</option>
                        <option>Terlama</option>
                    </select>
                    <button className="btn btn-neutral bg-black text-white"><SearchOutlinedIcon /></button>
                    <Link href={"/admin/user/create"} className="btn bg-white text-black"><AddCircleOutlineOutlinedIcon /> Tambah User</Link>
                </div>
            </div>
            <div className='pb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'>
                <div className="group bg-white rounded-lg border">
                    <div className="flex justify-end dropdown px-2">
                        <div tabIndex={0} role="button"><MoreHorizIcon /></div>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 space-y-2">
                            <li><button className="btn bg-white text-black"><EditOutlinedIcon /> Edit Detail User</button></li>
                            <li><button className="btn bg-white text-red-500 hover:bg-red-50 hover:border-red-300"><DeleteOutlineOutlinedIcon /> Delete User</button></li>
                        </ul>
                    </div>
                    <Image src={profile} alt='profile' className='size-[150px] rounded-full mx-auto object-cover object-top' />
                    <div className="flex flex-col items-center p-5 space-y-2">
                        <h3 className="text-xl font-medium text-gray-900">John Doe</h3>
                        <span className="whitespace-nowrap rounded-full bg-gray-100 px-10 py-0.5 text-xs text-black text-center">
                            Staff
                        </span>
                        <p className='text-xs font-medium flex justify-between w-full'>NIP <span>00123123806792</span></p>
                        <p className='text-xs font-medium flex justify-between w-full'>Alamat <span>Padang</span></p>
                        <p className='text-xs font-medium flex justify-between w-full'>Jenis Kelamin <span>Pria</span></p>
                        <p className='text-xs font-medium flex justify-between w-full'>Nomor HP <span>081277948899</span></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default page
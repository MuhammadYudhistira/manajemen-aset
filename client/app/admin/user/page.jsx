import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import Face3OutlinedIcon from '@mui/icons-material/Face3Outlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';

import Link from 'next/link';
import GridUser from '@/components/(user)/GridUser';


const page = () => {
    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8 mb-7">
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
            <div className='pb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-4 lg:gap-4'>
                <GridUser />
            </div>
        </>
    )
}

export default page
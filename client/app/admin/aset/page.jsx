import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import Link from 'next/link';
import GridAset from '@/components/(aset)/GridAset';

const page = () => {

    return (
        <>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 mb-7">
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <Inventory2OutlinedIcon />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">1.254</p>
                        <p className="text-sm text-gray-500">Jumlah Aset</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <CheckOutlinedIcon />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">1.001</p>
                        <p className="text-sm text-gray-500">Aktif</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <CloseOutlinedIcon />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">253</p>
                        <p className="text-sm text-gray-500">Tidak Aktif</p>
                    </div>
                </article>
                <article className="flex items-center gap-4 rounded-xl border bg-white p-6">
                    <span className="rounded-full bg-blue-50 p-3">
                        <BuildOutlinedIcon />
                    </span>

                    <div>
                        <p className="text-2xl font-medium text-gray-900">956</p>
                        <p className="text-sm text-gray-500">Sedang Diperbaiki</p>
                    </div>
                </article>
            </div>
            <div className='flex gap-4'>
                <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full">
                    <input type="text" placeholder="Nama Aset" className="input input-bordered input-md w-full lg:max-w-xs" />
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Aktif</option>
                        <option>Tidak Aktif</option>
                        <option>Sedang diperbaiki</option>
                    </select>
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Terbaru</option>
                        <option>Terlama</option>
                    </select>
                    <button className="btn btn-neutral bg-black text-white"><SearchOutlinedIcon /></button>
                    <button className="btn bg-white text-black ml-auto"><AddCircleOutlineOutlinedIcon /> Tambah Aset</button>
                </div>
            </div>
            <div className=' pb-10 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8'>
                <GridAset />
            </div>
        </>
    )
}

export default page
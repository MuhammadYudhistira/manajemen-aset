import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GridAset from '@/components/(aset)/GridAset';
import StatsAset from '@/components/(aset)/StatsAset';
import Link from 'next/link';

const page = () => {


    return (
        <>
            <StatsAset />
            <div className='flex gap-4'>
                <div className="flex flex-1 flex-col lg:flex-row gap-4 w-full">
                    <input type="text" placeholder="Nama Aset" className="input input-bordered input-md w-full lg:max-w-xs" />
                    <select className="select select-bordered w-full lg:max-w-xs">
                        <option>Terbaru</option>
                        <option>Terlama</option>
                    </select>
                    <button className="btn btn-neutral bg-black text-white"><SearchOutlinedIcon /></button>
                    <Link href={"/admin/aset/create"} className="btn bg-white text-black ml-auto"><AddCircleOutlineOutlinedIcon /> Tambah Aset</Link>
                </div>
            </div>
            <div className='py-10 grid grid-cols-1 gap-4 sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 lg:gap-8'>
                <GridAset />
            </div>
        </>
    )
}

export default page
import AutoAwesomeMosaicOutlinedIcon from '@mui/icons-material/AutoAwesomeMosaicOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import HomeRepairServiceOutlinedIcon from '@mui/icons-material/HomeRepairServiceOutlined';
import LaptopOutlinedIcon from '@mui/icons-material/LaptopOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import FolderSharedOutlinedIcon from '@mui/icons-material/FolderSharedOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../app/icon.svg'

const Layout = () => {
    return (
        <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-60 min-h-full bg-white text-base-content border">
                <li><Link href={"/"} className='text-lg font-bold'> <Image src={logo} alt='logo' width={30} />DPRD SUMBAR</Link></li>
                <div className="divider mt-0"></div>
                <li><Link href="/admin"><AutoAwesomeMosaicOutlinedIcon />Dashboard</Link></li>
                <li><Link href="/admin/aset"><Inventory2OutlinedIcon /> Aset</Link></li>
                <li><Link href="/admin/user"><GroupsOutlinedIcon /> User</Link></li>
                <li><Link href="/admin/penanggung_jawab"><FolderSharedOutlinedIcon /> Penanggung Jawab</Link></li>
                <li><Link href="/admin/ruangan"><MeetingRoomOutlinedIcon /> Ruangan</Link></li>
                <li>
                    <details>
                        <summary className="group"><FolderOpenOutlinedIcon />Laporan</summary>
                        <ul className="bg-slate-50 rounded-xl">
                            <li><Link href="/admin/laporan_perbaikan" className=""><HomeRepairServiceOutlinedIcon />Perbaikan</Link></li>
                            <li><Link href="/admin/rekap_aset" className="group"> <LaptopOutlinedIcon />Rekap Aset</Link></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    )
}

export default Layout
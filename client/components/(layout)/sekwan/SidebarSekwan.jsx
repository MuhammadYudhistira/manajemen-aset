import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import Image from "next/legacy/image";
import { Link } from 'next-view-transitions'
import logo from "@/app/icon.svg";

const SidebarSekwan = () => {
    return (
        <div className="drawer-side z-50">
            <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-60 border bg-white p-4 text-base-content">
                <li>
                    <Link href={"/"} className="text-lg font-bold">
                        {" "}
                        <Image src={logo} alt="logo" width={30} height={30} />
                        DPRD SUMBAR
                    </Link>
                </li>
                <div className="divider mt-0"></div>
                <li>
                    <Link href="/sekwan">
                        <AutoAwesomeMosaicOutlinedIcon />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/sekwan/aset">
                        <Inventory2OutlinedIcon /> Aset
                    </Link>
                </li>
                <li>
                    <Link href="/sekwan/usulan">
                        <RequestPageOutlinedIcon />
                        Usulan Pengadaan
                    </Link>
                </li>
                <li>
                    <details>
                        <summary className="group">
                            <FolderOpenOutlinedIcon />
                            Laporan
                        </summary>
                        <ul className="rounded-xl bg-slate-50">
                            <li>
                                <Link href="/sekwan/laporan_perbaikan" className="group">
                                    {" "}
                                    <HomeRepairServiceOutlinedIcon />
                                    Laporan Perbaikan
                                </Link>
                            </li>
                            <li>
                                <Link href="/sekwan/kib" className="">
                                    <LaptopOutlinedIcon />
                                    Kartu Inventaris Barang
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    )
}

export default SidebarSekwan
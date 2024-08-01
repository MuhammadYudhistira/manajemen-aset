import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import Image from "next/legacy/image";
import Link from "next/link";
import logo from "@/app/icon.svg";

const SidebarHead = () => {
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
                    <Link href="/head">
                        <AutoAwesomeMosaicOutlinedIcon />
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link href="/head/aset">
                        <Inventory2OutlinedIcon /> Aset
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
                                <Link href="/head/laporan_kerusakan" className="group">
                                    {" "}
                                    <BuildOutlinedIcon />
                                    Kerusakan
                                </Link>
                            </li>
                            <li>
                                <Link href="/head/permintaan_perbaikan" className="">
                                    <HomeRepairServiceOutlinedIcon />
                                    Permintaan Perbaikan
                                </Link>
                            </li>
                            <li>
                                <Link href="/head/laporan_perbaikan" className="">
                                    <BookOutlinedIcon />
                                    Laporan Perbaikan
                                </Link>
                            </li>
                        </ul>
                    </details>
                </li>
            </ul>
        </div>
    );
};

export default SidebarHead;

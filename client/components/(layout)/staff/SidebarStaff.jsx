import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import Image from "next/legacy/image";
import { Link } from 'next-view-transitions'
import logo from "@/app/icon.svg";

const SidebarStaff = () => {
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
                    <Link href="/staff">
                        <AutoAwesomeMosaicOutlinedIcon />
                        Home
                    </Link>
                </li>
                <li>
                    <Link href="/staff/laporan">
                        <FolderOpenOutlinedIcon />
                        Laporan kerusakan
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default SidebarStaff
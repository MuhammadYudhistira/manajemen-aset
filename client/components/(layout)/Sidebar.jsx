import AutoAwesomeMosaicOutlinedIcon from "@mui/icons-material/AutoAwesomeMosaicOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import HomeRepairServiceOutlinedIcon from "@mui/icons-material/HomeRepairServiceOutlined";
import LaptopOutlinedIcon from "@mui/icons-material/LaptopOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import FolderSharedOutlinedIcon from "@mui/icons-material/FolderSharedOutlined";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import RequestPageOutlinedIcon from '@mui/icons-material/RequestPageOutlined';
import Image from "next/legacy/image";
import { Link } from 'next-view-transitions'
import logo from "../../app/icon.svg";

const Layout = () => {
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
          <Link href="/admin">
            <AutoAwesomeMosaicOutlinedIcon />
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/admin/aset">
            <Inventory2OutlinedIcon /> Barang
          </Link>
        </li>
        <li>
          <Link href="/admin/user">
            <GroupsOutlinedIcon /> User
          </Link>
        </li>
        <li>
          <Link href="/admin/penanggung_jawab">
            <FolderSharedOutlinedIcon /> Penanggung Jawab
          </Link>
        </li>
        <li>
          <Link href="/admin/ruangan">
            <MeetingRoomOutlinedIcon /> Ruangan
          </Link>
        </li>
        <li>
          <Link href="/admin/usulan">
            <RequestPageOutlinedIcon />
            Usulan Pengadaan
          </Link>
        </li>
        <li>
          <Link href="/admin/pengadaan">
            <ReceiptLongOutlinedIcon /> Pengadaan
          </Link>
        </li>
        <li>
          <Link href="/admin/laporan_pemusnahan_aset" className="">
            <FolderDeleteOutlinedIcon />
            Pemusnahan Aset
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
                <Link href="/admin/laporan_perbaikan" className="">
                  <HomeRepairServiceOutlinedIcon />
                  Perbaikan
                </Link>
              </li>
              <li>
                <Link href="/admin/kib" className="group">
                  {" "}
                  <LaptopOutlinedIcon />
                  Kartu Inventaris Barang
                </Link>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  );
};

export default Layout;

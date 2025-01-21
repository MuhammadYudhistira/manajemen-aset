import TablePengadaan from "@/components/(table)/TablePengadaan";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link } from "next-view-transitions";
import React from "react";

const page = () => {
  return (
    <>
      <div className="flex justify-end items-center">
        <Link href={"/admin/pengadaan/create"} className="btn btn-xs sm:btn-sm md:btn-md border-0 outline-none bg-white"> <AddCircleOutlineOutlinedIcon />Tambah Catatan Pengadaan</Link>
      </div>
      <div className="mt-4 rounded-xl border bg-white p-5">
        <h2 className="text-xl font-bold">Catatan Pengadaan Aset</h2>
        <TablePengadaan />
      </div>
    </>
  );
};

export default page;

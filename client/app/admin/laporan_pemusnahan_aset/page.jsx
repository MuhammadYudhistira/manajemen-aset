import TableReportArchiveAsset from "@/components/(table)/TableReportArchiveAsset";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Link } from "next-view-transitions";
import React from "react";

const page = () => {
    return (
        <>
            <div className="flex justify-end items-center">
                <Link href={"/admin/laporan_pemusnahan_aset/create"} className="btn btn-xs sm:btn-sm md:btn-md border-0 outline-none bg-white"> <AddCircleOutlineOutlinedIcon />Tambah Usulan</Link>
            </div>
            <div className="mt-4 rounded-xl border bg-white p-5">
                <h2 className="text-xl font-bold">Laporan Pemusnahan Aset</h2>
                <TableReportArchiveAsset />
            </div>
        </>
    );
};

export default page;

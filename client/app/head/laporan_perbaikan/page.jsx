import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import TableRepairReport from "@/components/(table)/TableRepairReport";
import React from "react";
import Link from "next/link";

const page = () => {
    return (
        <>
            <div className="mt-8 flex gap-4">
                <div className="ml-auto">
                    <Link href={"/head/laporan_perbaikan/create"} className="btn bg-white text-black">
                        <AddCircleOutlineOutlinedIcon /> Buat Permintaan Perbaikan
                    </Link>
                </div>
            </div>
            <div className="mt-4 rounded-xl border bg-white p-5">
                <TableRepairReport />
            </div>
        </>
    );
};

export default page;

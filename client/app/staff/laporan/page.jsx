import TableDamageReport from "@/components/(table)/TableDamageReport";
import React from "react";

const page = () => {
    return (
        <>
            <div className="mt-4 rounded-xl border bg-white p-5">
                <h2 className="font-semibold text-black">Laporan kerusakan</h2>
                <TableDamageReport />
            </div>
        </>
    );
};

export default page;

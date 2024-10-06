import CreatePemusnahan from "@/components/(form)/laporan_pemusnahan/CreatePemusnahan";
import React from "react";

const page = () => {
    return (
        <>
            <div className="rounded-xl bg-white p-5">
                <h2 className="text-xl font-bold mb-5">Tambah Usulan Pemusnahan Aset</h2>
                <CreatePemusnahan />
            </div>
        </>
    );
};

export default page;

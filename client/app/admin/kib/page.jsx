import TableKIB from "@/components/(table)/TableKIB";
import React from "react";
import logo from "@/public/logo.png"
import Image from "next/image";
import KIB from "@/components/(reports)/KIB";

const page = () => {
  return (
    <>
      <KIB />
      <div className="mt-4 rounded-xl border bg-white p-5">
        <div className="grid grid-cols-3">
          <Image src={logo} width={60} height={60} />
          <div>
            <h1 className="text-center text-xl font-bold uppercase">Kartu Inventaris Barang</h1>
            <h2 className="text-center text-xl font-bold uppercase">KIB B (Peralatan dan Mesin)</h2>
          </div>
        </div>
        <TableKIB />
      </div>
    </>
  );
};

export default page;

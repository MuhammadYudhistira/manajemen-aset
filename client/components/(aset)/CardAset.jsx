import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const CardAset = ({ kode, image, nama, role, jenis, merk, ukuran, keterangan }) => {
  return (
    <Link
      key={kode}
      href={`/${role}/aset/${kode}`}
      className="group rounded-lg border bg-white"
    >
      <div className="relative h-56 w-full">
        <Image
          alt={nama}
          src={image}
          layout="fill"
          className="rounded-t-lg object-cover object-center"
          priority
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-900">{nama}</h3>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {merk} {ukuran}
        </p>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {jenis}
        </p>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {keterangan}
        </p>
      </div>
    </Link>
  );
};

export default CardAset;

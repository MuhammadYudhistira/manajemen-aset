import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";

const CardAset = ({ id, image, nama, deskripsi, ukuran, role }) => {
  return (
    <Link
      key={id}
      href={`/${role}/aset/${id}`}
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
          {deskripsi}
        </p>
        <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
          {ukuran}
        </p>
      </div>
    </Link>
  );
};

export default CardAset;

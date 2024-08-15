import React from "react";
import Image from "next/image";
import ActionUser from "./ActionUser";

const CardUser = ({
  profile,
  nama,
  role,
  nip,
  alamat,
  jenis_kelamin,
  no_hp,
  id,
}) => {
  return (
    <div className="group rounded-lg border bg-white">
      <ActionUser id={id} role={role} />
      <Image
        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${profile}`}
        width={500}
        height={500}
        alt={nama}
        priority
        className="mx-auto size-[100px] rounded-full object-cover object-center xl:size-[150px]"
      />
      <div className="flex flex-col items-center space-y-2 p-5">
        <h3 className="text-center text-xl font-medium text-gray-900">
          {nama}
        </h3>
        <span className="whitespace-nowrap rounded-full bg-gray-100 px-10 py-0.5 text-center text-xs text-black">
          {role === "KEPALA_BAGIAN" ? "KEPALA BAGIAN" : role}
        </span>
        <p className="flex w-full justify-between text-xs font-medium">
          NIP <span>{nip}</span>
        </p>
        <p className="flex w-full justify-between text-xs font-medium">
          Alamat <span className="ml-10 flex-grow text-right">{alamat}</span>
        </p>
        <p className="flex w-full justify-between text-xs font-medium">
          Jenis Kelamin <span>{jenis_kelamin}</span>
        </p>
        <p className="flex w-full justify-between text-xs font-medium">
          Nomor HP <span>{no_hp}</span>
        </p>
      </div>
    </div>
  );
};

export default CardUser;

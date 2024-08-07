"use client";
import React from "react";
import CardUser from "./CardUser";
import SkeletonLoading from "../(global)/SkeletonLoading";
import { useFetchUser } from "@/hooks/user/useFetchUser";

const GridUser = ({ data, isLoading }) => {

  if (isLoading) {
    return (
      <>
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
        <SkeletonLoading />
      </>
    );
  }

  return (
    <>
      {data.map((user) => {
        return (
          <CardUser
            key={user.id}
            id={user.id}
            nama={user.nama}
            profile={user.image}
            alamat={user.alamat}
            jenis_kelamin={user.jenis_kelamin}
            nip={user.nip}
            no_hp={user.no_hp}
            role={user.role}
          />
        );
      })}
    </>
  );
};

export default GridUser;

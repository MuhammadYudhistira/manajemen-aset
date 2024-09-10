"use client"
import React from "react";
import CreatePJForm from "@/components/(form)/penanggung_jawab/CreatePJForm";
import GridPJ from "@/components/(penanggung_jawab)/GridPJ";
import { useFetchUserWhoseCustodian } from "@/hooks/penanggung_jawab/useFetchUserWhoseCustodian";
import { Spinner } from "@nextui-org/react";

const page = () => {

  const { data, isLoading } = useFetchUserWhoseCustodian()

  return (
    <>
      <div className="mt-8 flex gap-4">
        <div className="ml-auto">
          <CreatePJForm />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 pb-10 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        <GridPJ data={data} isLoading={isLoading} />
      </div>
    </>
  );
};

export default page;

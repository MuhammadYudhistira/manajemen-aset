import TablePJ from "@/components/(table)/TablePJ";
import React, { Suspense } from "react";
import CreatePJForm from "@/components/(form)/penanggung_jawab/CreatePJForm";
import { Spinner } from "@nextui-org/react";

const page = () => {
  return (
    <>
      <div className="mt-8 flex gap-4">
        <div className="ml-auto">
          <CreatePJForm />
        </div>
      </div>
      <div className="mt-4 rounded-xl border bg-white p-5">
        <Suspense fallback={<Spinner />}>
          <TablePJ />
        </Suspense>
      </div>
    </>
  );
};

export default page;

import CreateRuanganForm from "@/components/(form)/Ruangan/CreateRuanganForm";
import TableRuangan from "@/components/(table)/TableRuangan";
import { Spinner } from "@nextui-org/react";
import React, { Suspense } from "react";

const page = () => {
  return (
    <>
      <div className="mt-8 flex gap-4">
        <div className="ml-auto">
          <CreateRuanganForm />
        </div>
      </div>

      <div className="mt-4 rounded-xl border bg-white p-5">
        <Suspense fallback={<Spinner />}>
          <TableRuangan />
        </Suspense>
      </div>
    </>
  );
};

export default page;

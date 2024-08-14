
import GridAset from "@/components/(aset)/GridAset";
import StatsAset from "@/components/(aset)/StatsAset";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <StatsAset />
      <Suspense fallback={<Spinner />}>
        <GridAset />
      </Suspense>
    </>
  );
};

export default page;

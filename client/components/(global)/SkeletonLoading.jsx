import { Card, Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonLoading = ({ index }) => {
  return (
    <Card key={index} className="space-y-5" radius="lg">
      <Skeleton className="rounded-t-lg">
        <div className="h-56 rounded-t-lg bg-default-300"></div>
      </Skeleton>
      <div className="space-y-3 p-5">
        <Skeleton className="w-3/5 rounded-lg">
          <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-4/5 rounded-lg">
          <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-2/5 rounded-lg">
          <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
        </Skeleton>
      </div>
    </Card>
  );
};

export default SkeletonLoading;

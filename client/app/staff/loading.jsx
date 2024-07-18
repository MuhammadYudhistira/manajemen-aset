import { Spinner } from "@nextui-org/react";
import React from "react";

const loading = () => {
    return (
        <div className="flex items-center justify-center">
            <Spinner size="lg" />
        </div>
    );
};

export default loading;

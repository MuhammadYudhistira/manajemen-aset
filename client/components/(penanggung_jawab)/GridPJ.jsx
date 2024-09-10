"use client";
import React from "react";
import CardPJ from "./CardPJ";

const GridPJ = ({ data, isLoading }) => {

    if (isLoading) {
        return (
            <>
                <div className="flex flex-col gap-4 bg-white p-3">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 bg-white p-3">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
                <div className="flex flex-col gap-4 bg-white p-3">
                    <div className="flex items-center gap-4">
                        <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
                        <div className="flex flex-col gap-4">
                            <div className="skeleton h-4 w-20"></div>
                            <div className="skeleton h-4 w-28"></div>
                        </div>
                    </div>
                    <div className="skeleton h-32 w-full"></div>
                </div>
            </>
        );
    }

    return (
        <>
            {data?.map((user) => {
                return (
                    <CardPJ
                        nama={user.nama}
                        profile={user.image}
                        nip={user.nip}
                        key={user.id}
                        asets={user.Penanggung_Jawab}
                    />
                );
            })}
        </>
    );
};

export default GridPJ;

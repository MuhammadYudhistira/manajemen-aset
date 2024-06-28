"use client"
import axios from '@/libs/axios'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import CardUser from './CardUser'

const GridUser = () => {

    const { data: users, isLoading } = useQuery({
        queryFn: async () => {
            const response = await axios.get("/user")

            return response.data.payload
        },
        queryKey: ["users"]
    })

    console.log({ users })


    return (
        <>
            {users?.map((user) => {
                return (
                    <CardUser key={user.id}
                        nama={user.nama}
                        profile={user.profile}
                        alamat={user.alamat}
                        jenis_kelamin={user.jenis_kelamin}
                        nip={user.nip}
                        no_hp={user.no_hp}
                        role={user.role} />
                )
            })}
        </>
    )
}

export default GridUser
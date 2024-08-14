"use client"
import React, { Suspense } from 'react'
import background from "@/public/bgprofile2.png"
import Image from 'next/image'
import UpdateProfileForm from '@/components/(form)/profile/UpdateProfileForm'
import { useFetchMe } from '@/hooks/auth/useFetchMe'
import UpdatePasswordForm from '../(form)/profile/UpdatePasswordForm'
import { Spinner } from '@nextui-org/react'

const Profile = () => {

    const { data: user } = useFetchMe({
        throwOnError: (error) => {
            console.log(error);
            toast.error(error.response.data.message)
        },
    })

    return (
        <>
            <Suspense fallback={<Spinner />}>
                <>
                    <div className='bg-white rounded-lg border space-y-2'>
                        <div className='p-5 flex justify-center items-center rounded-lg'
                            style={{
                                backgroundImage: `url(${background.src})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}>
                            <Image
                                src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user?.image}`}
                                width={500}
                                height={500}
                                priority
                                className='rounded-full size-48 md:size-60' />
                        </div>
                        <div className='text-center pb-5'>
                            <p className='text-xl font-bold'>{user?.nama}</p>
                            <p className='text-gray-400'>{user?.role === "KEPALA_BAGIAN" ? "KEPALA BAGIAN" : user?.role}</p>
                        </div>
                    </div>
                    <UpdateProfileForm />
                    <UpdatePasswordForm />
                </>
            </Suspense>
        </>
    )
}

export default Profile
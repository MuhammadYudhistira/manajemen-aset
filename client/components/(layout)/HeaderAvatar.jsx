"use client"
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { toast } from 'sonner'

const HeaderAvatar = () => {

    const token = Cookies.get("token")
    const user = jwtDecode(token)
    const handleOnclick = () => {
        Cookies.remove("token")
        toast.success("Berhasil Logout")
    }

    return (
        <div className="flex-none gap-2">
            <p className="font-medium hidden md:block">{user.nama}</p>
            <div className="dropdown dropdown-end">
                <div
                    tabIndex={0}
                    role="button"
                    className="avatar btn btn-circle btn-ghost"
                >
                    <div className="w-10 rounded-full">
                        <Image
                            alt="Tailwind CSS Navbar component"
                            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${user.profile}`}
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
                <ul
                    tabIndex={0}
                    className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                >
                    <li>
                        <Link href={"/profile"}>Profile</Link>
                    </li>
                    <li>
                        <Link href={"/login"} onClick={handleOnclick} className='text-red-500 bg-red-50 hover:bg-red-500 hover:text-red-50'>Logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderAvatar
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CardAset = ({ id, image, nama, deskripsi, ukuran }) => {
    return (
        <Link key={id} href={`/admin/aset/${id}`} className="group bg-white rounded-lg border">

            <div className="relative w-full h-56">
                <Image
                    alt={nama}
                    src={image}
                    fill
                    className="rounded-t-lg object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                />
            </div>
            <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900">{nama}</h3>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {deskripsi}
                </p>
                <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                    {ukuran}
                </p>
            </div>
        </Link>
    )
}

export default CardAset
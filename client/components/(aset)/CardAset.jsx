import Link from 'next/link'
import React from 'react'

const CardAset = ({ id, image, nama, deskripsi, ukuran }) => {
    return (
        <Link key={id} href={`/admin/aset/${id}`} className="group bg-white rounded-lg border">
            <img
                alt={nama}
                src={image || "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450&q=80"}
                className="h-56 w-full rounded-t-lg object-cover"
            />
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
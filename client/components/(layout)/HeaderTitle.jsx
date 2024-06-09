'use client'
import { usePathname } from 'next/navigation';
import React from 'react'

const HeaderTitle = () => {
    const pathname = usePathname();

    const formatTitle = (path) => {
        if (!path) return '';

        // Regular expression to match '/admin/aset/:id-aset'
        const detailAsetPattern = /^\/admin\/aset\/[^/]+$/;

        // Specific title for paths matching the pattern '/admin/aset/:id-aset'
        if (detailAsetPattern.test(path)) {
            return 'Detail Aset';
        }

        // Split the path by '/' and get the last segment
        const segments = path.split('/');
        const lastSegment = segments.pop() || '';

        // Split the last segment by '-' and capitalize each part
        const words = lastSegment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1));

        // Join the words back together with a space
        return words.join(' ');
    };

    const title = formatTitle(pathname);
    return (
        <div className="flex-1">
            <a className="btn btn-ghost text-xl">{title}</a>
        </div>
    );
}

export default HeaderTitle
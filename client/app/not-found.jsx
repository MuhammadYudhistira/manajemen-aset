import img404 from "@/public/404.png";

import Image from 'next/image'
import Link from 'next/link'

const NotFound = () => {
    return (
        <>
            <div className="lg:px-24 lg:py-24 md:py-20 md:px-44 px-4 py-24 items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
                <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
                    <div className="relative">
                        <div className="absolute">
                        </div>
                        <div>
                            <Image src={img404} priority alt='not-found' className='w-[50%]' />
                        </div>
                        <div className="">
                            <h1 className="my-2 text-gray-800 font-bold text-2xl">
                                Looks like youve found the
                                doorway to the great nothing
                            </h1>
                            <p className="my-4 text-gray-800">Sorry about that! Please visit our hompage to get where you need to go.</p>
                            <Link href={"/"} className="sm:w-full lg:w-auto my-2 border rounded-lg py-4 px-8 text-center bg-red-500 text-white hover:bg-red-700">Take me there!</Link>
                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>
        </>

    )
}

export default NotFound
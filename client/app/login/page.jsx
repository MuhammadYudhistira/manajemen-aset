import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <section className="bg-white" >
            <div className="w-full lg:flex lg:min-h-screen">
                <div className='w-full px-16 py-32 lg:w-[50%] md:px-28 md:py-52 h-screen flex flex-col'>
                    <a className="flex justify-center items-center font-bold text-2xl" href="#">
                        <img alt="asd"
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_arms_of_West_Sumatra.svg/800px-Coat_of_arms_of_West_Sumatra.svg.png"
                            className='w-10' />
                        DPRD SUMBAR
                    </a>
                    <h1 className="mt-6 text-xl font-bold text-gray-900 md:text-2xl">Login</h1>
                    <p className="mt-4 leading-relaxed text-gray-500">Masukkan informasi detail untuk masuk ke dalam sistem</p>
                    <form action="#" className="mt-8 flex flex-col gap-6 w-full">
                        <div className="w-full">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                <input type="text" className="grow" placeholder="Email" />
                            </label>
                        </div>
                        <div className="w-full">
                            <label className="input input-bordered flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                <input type="password" className="grow" placeholder='Password' />
                            </label>
                        </div>

                        <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                            <Link href={"/admin"} className="w-full inline-block shrink-0 rounded-lg border border-black bg-black px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none text-center">
                                Login
                            </Link>
                        </div>
                        <Link href={"/forget-password"} className='text-sm font-semibold'>Forget Password?</Link>
                    </form>
                </div>
                <div className='hidden lg:w-[50%] lg:flex p-5 bg-gray-100'>
                    <img
                        alt=""
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Coat_of_arms_of_West_Sumatra.svg/800px-Coat_of_arms_of_West_Sumatra.svg.png"
                        className="h-[90%] w-full object-contain"
                    />
                </div>
            </div>
        </section >
    )
}


export default page
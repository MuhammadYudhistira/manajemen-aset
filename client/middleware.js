import { NextResponse } from "next/server"

export function middleware(request){

    let cookie = request.cookies.get('token')
    console.log(cookie)

    NextResponse.next()
}
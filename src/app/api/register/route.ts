import { NextResponse } from "next/server"
import { db } from "@/db"

export async function POST(request: Request){
    try{
        // parsing the request body
        const body = await request.json()
        const {name, username, email, password} = body
        // check if the user provided all the credentials
        if(!email || !name || !username || !password){
            return new NextResponse("Missing info", {
                status: 400,
            })
        }
        // hash password
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 12)
        // create the user
        const user = await db.user.create({
            data: {
                email,
                name,
                username,
                hashedPassword,
            }
        })
        
        return NextResponse.json(user,{
            status: 201
        })
    }
    catch(error: any){
        console.log(error.message)
        return new NextResponse("Internal Server error", {
            status: 500 
        })
    }
}
"use server"

import { signIn } from "next-auth/react"
import { redirect } from "next/navigation"
import toast from "react-hot-toast"


export async function CreatePost(formdata: FormData){
    
    
}

export async function socialAction(action: string){
    try{
        const result = await signIn(action, { redirect: false })
        // If the social signin failed for some reason
        if(result?.error){
            console.log(result.error)
            toast.error(result.error)
        }
        else if(!result?.error && result?.ok){
            console.log(result)
            toast.success("signed in")
            redirect("/")
        }
    }
    catch(error: any){
        console.log(error)
        toast.error(error.response.data || "something went wrong")
    }
}
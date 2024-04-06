"use server"

import { db } from "@/db"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { signIn } from "../../auth"
import {AuthError} from "next-auth"
import { AuthenticationFormSchema } from "@/lib/validation"
import { z } from "zod"
import { DEFAULT_REDIRECT_ROUTE } from "../routes"

interface POST {
    word: string,
    definition: string,
    examples: string[],
    spokenArea: string,
    postedBy: string,
    posterUsername: string
}

export async function getCurrentUser(){
    const session = await auth()
    if(!session?.user?.email){
        return null
    }
    else if(session.user.email){
        const user = await db.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        return user
    }
}
export async function checkIfUserHasSignedIn() {
    const session = await auth()
    if(!session?.user?.email){
        redirect("/signin")
    }
    else{
        redirect("/define")
    }
}
export async function CreatePost(post: POST){
    console.log(post)
    await db.post.create({
        data: {
            word: post.word,
            definition: post.definition,
            examples: post.examples,
            spokenArea: post.spokenArea,
            postedBy: post.postedBy,
            posterUsername: post.posterUsername
        }
    })
    // Revalidate the home page to make it in sync with our database
    revalidatePath("/")
}
export async function getUserByEmail(email: string){
    try{
    const user = await db.user.findUnique({
        where: {
            email
        }
    })
    return user
    }
    catch{
        return null
    }
}
export async function getUserById(id: string){
    try{
    const user = await db.user.findUnique({
        where: {
            id
        }
    })
    return user
    }
    catch{
        return null
    }
    
}
export async function Login(values: z.infer<typeof AuthenticationFormSchema>){
    const validatedFields = AuthenticationFormSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: "Invalid inputs detected"}
    }
    const {email, password} = validatedFields.data
    try{
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_ROUTE
        })

    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case "CredentialsSignin":
                    return {error: "Invalid credentials"}
                default:
                    return { error: "Something went wrong"}
            }
        }
        throw error
    }
}
export async function SocialLogin(action: string){
    try{
        await signIn(action, { redirectTo: DEFAULT_REDIRECT_ROUTE })
    }
    catch(error: any){
        if(error instanceof AuthError){
            switch(error.type){
                case "OAuthAccountNotLinked":
                    return {error: `Failed to link your ${action} account`}
                case "OAuthSignInError":
                    return {error: "Sign in failed"}
                case "OAuthCallbackError":
                    return {error: "Failed to communicate with the oAuth provider"}
                default:
                    return { error: "Something went wrong"}
            }
        }
        throw error
    }
}
export async function Register(values: z.infer<typeof AuthenticationFormSchema>){
    const validatedFields = AuthenticationFormSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: "Invalid Input detected"}
    }
    const {firstname, lastname, username, email, password, confirmPassword} = validatedFields.data
    if(!firstname || !lastname || !username || !confirmPassword){
        return {error: "Missing fields"}
    }
    try{
        /**
         * Check if the email already exists before creating the user
         */
        const user = await getUserByEmail(email)
        if(!user){
            return {error: "This email already exists"}
        }
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 12)
        const newuser = await db.user.create({
            data: {
                name: `${firstname} ${lastname}`,
                username: username.includes("@") ? username.replace("@", "") : username,
                email: email,
                hashedPassword
            }
        })
        // TODO: Sending emails

    }
    catch(error){
        throw error
    }
    
}
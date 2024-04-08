"use server"

import { db } from "@/db"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { signIn } from "../../auth"
import { AuthenticationFormSchema, WordDefinitionFormSchema } from "@/lib/validation"
import { z } from "zod"
import { DEFAULT_REDIRECT_ROUTE } from "../routes"
import { redirect } from "next/navigation"
import { generateToken } from "@/lib/token"
import { SendEmailVerification } from "@/lib/mail"
import { getVerficationTokenByToken } from "@/db/verification-token"
import { CREDENTIALS_PROVIDER } from "@/constants"
import { AuthError } from "next-auth"


export async function CheckIfAuthorized(){
    let session
    try{
        session = await auth()
    }
    catch(error){
        throw error
    }
    if(!session?.user?.email){
        redirect("/signin")
    }
    else{
        redirect("/define")
    }
}
export async function getCurrentUser(){
    try{
        const session = await auth()
        if(!session?.user) return null
        const user = await getUserById(session.user.id as string)
        if(!user) return null
        return user
    }
    catch(error){
        return null
    }
}
export async function CreatePost(values: z.infer<typeof WordDefinitionFormSchema>){
    const validatedFields = WordDefinitionFormSchema.safeParse(values)
    if(!validatedFields.success){
        return {error: "Invalid input"}
    }
    const {word, definition, examples, spokenArea} = validatedFields.data
    try{
        
        const user = await getCurrentUser()
        if(!user){
            return {error: "Database connection failed"}
        }
        await db.post.create({
            data: {
                word,
                definition,
                examples: examples.split(","),
                spokenArea,
                postedBy: user.id,
                posterUsername: user?.username!
            }
        })
    }
    catch(error: any){
        if(error instanceof Error){
            return {errror: error.message}
        }
        return {error: "Database connection failed."}
    }
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
    if(!user) return null
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
    if(!user) return null
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
        // check if the user has verified their email
        const user = await getUserByEmail(email)
        if(!user || !user.hashedPassword){
            return {error: "User not found"}
        }
        if(user && !user.emailVerified){
            const verificationToken = await generateToken(user.email)
            // sending emails to verify user's email
            await SendEmailVerification({
                email: user.email,
                token: verificationToken,
                name: user.name
            })
            return {email: "Email sent! Please verify your email address"}
        }

        await signIn(CREDENTIALS_PROVIDER, {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_ROUTE
        })
    }
    catch(error: any){
        if(error instanceof AuthError){
            if(error.type === "CredentialsSignin"){
                return {error: "Invalid Credentials"}
            }
        }
        throw error
    }
}
export async function SocialLogin(action: string){
    await signIn(action, {redirectTo: DEFAULT_REDIRECT_ROUTE})
    revalidatePath("/")
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
        if(user){
            return {error: "User with this email already exists"}
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
        const verificationToken = await generateToken(email)
        // sending emails to verify user's email
        await SendEmailVerification({
            email: newuser.email,
            token: verificationToken,
            name: newuser.name
        })
    }
    catch(error){
        if(error instanceof Error){
            return { error: error.message }
        }
        return {error: "Database connection failed because it's free plan"}
    }

    return {success: "Email sent! Please verify your email address"}

}
export async function FecthAllPosts(){
    try{
        const posts = await db.post.findMany()
        return posts
    }
    catch(error: any){
        throw new Error(error)
    }
}
export async function CheckEmailVerification(token: string){
    const verificationToken = await getVerficationTokenByToken(token)
    if(!verificationToken){
        return {error: "Invalid token. please try logging in again"}
    }
    // check if the token has expired 
    const isTokenExpired = new Date(verificationToken.expires) < new Date()
    if(isTokenExpired){
        return {error: "Your token has expired. please try logging in again"}
    }
    try{
        // update the emailVerified property of the user to the current date and delete the verification token
        await db.user.update({
            where: {
                email: verificationToken.email
            },
            data: {
                emailVerified: new Date()
            }
        })
        await  db.verificationToken.delete({
            where: {
                id: verificationToken.id
            }
        })
    }
    catch(error: any){
        throw Error(error)
    }
    
    revalidatePath("/")

    redirect("/signin")

}
export async function LikePost(postId: string){
    
}
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
import { AUTH_STATUS, CREDENTIALS_PROVIDER, DATABASE_CONNECTION_ERROR_MESSAGE, LIKE_DISLIKE, PAGE_SIZE } from "@/constants"
import { AuthError } from "next-auth"


export async function CheckIfAuthorized(){
    try{
        const session = await auth()
        if(!session?.user){
            return {status: AUTH_STATUS.unAuthenticated}
        }
        else{
            return {status: AUTH_STATUS.Authenticated}
        }
    }
    catch(error: any){
        return {error: "Database connecton failed"}
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
    catch(error: any){
        throw Error(error)
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
        const newpost = await db.post.create({
            data: {
                word,
                definition,
                examples: examples.split(","),
                spokenArea,
                postedBy: user.id,
                posterUsername: user?.username!
            }
        })
        return {success: newpost}
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
    if(!user) return {success: null}
    return {success: user}
    }
    catch{
        return {error: "Database connection failed"}
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
    const isMyMail = email === process.env.MY_EMAIL
    try{
        // check if the user has verified their email
        const result = await getUserByEmail(email)
        if(result.error) return {error: result.error}
        const user = result.success
        if(!user || !user.hashedPassword){
            return {error: "User not found"}
        }
        if(isMyMail && user && !user.emailVerified){
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
    const isMyMail = email === process.env.MY_EMAIL
    try{
        /**
         * Check if the email already exists before creating the user
         */
        const result = await getUserByEmail(email)
        if(result.error) return {error: result.error}
        const user = result.success
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
        if(isMyMail){
            const verificationToken = await generateToken(email)
            // sending emails to verify user's email
            await SendEmailVerification({
                email: newuser.email,
                token: verificationToken,
                name: newuser.name
            })
        }
    }
    catch(error){
        if(error instanceof Error){
            return { error: error.message }
        }
        return {error: "Database connection failed because it's free plan"}
    }

    if(isMyMail){
        return {success: "Email sent! Please verify your email address"}
    }
    else{
        await signIn(CREDENTIALS_PROVIDER, {
            email,
            password,
            redirectTo: DEFAULT_REDIRECT_ROUTE
        })
    }
}
export async function FecthAllPosts({pageNumber, city, search}: {pageNumber: number, city: string | null, search: string | null | undefined}){
    try{
        let query = await db.post.findMany({
            orderBy: {
                created_at: "desc"
            }
        })
        if(city){
            query = query.filter((post) => post.spokenArea === city)
        }
        if(search){
            query = query.filter((post) => post.word === search)
        }
        const totalQueriedResults = query.length
        const offset = (pageNumber - 1 ) * PAGE_SIZE
        // Slicing the array based on the page size
        const posts = query.slice(offset, offset + PAGE_SIZE)
        const count = await db.post.count()

        return {posts, count, totalQueriedResults}

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
// export async function LikePost(postId: string){
//     try{
//         // first find the post
//         const post = await db.post.findFirst({
//             where: {
//                 id: postId
//             }
//         })
//         if(!post){
//             return {error: "post not found"}
//         }
//         // find the current user
//         const currentUser = await getCurrentUser()
//         if(!currentUser){
//             return {error: "please login to perform this action"}
//         }
//         // Check If the user Already liked the post
//         const userAlreadyLiked = post.like.includes(currentUser.id)
//         let tempArray
//         if(userAlreadyLiked){
//             tempArray = post.like.filter((userId) => userId !== currentUser.id)
//         }
//         else{
//             // Add the current user's Id to the like array of the post
//             tempArray = [...post.like, currentUser.id]
//         }
//         // update the post
//         await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 like: tempArray
//             }
//         })
//         // Check If the user disliked the post. because one user can not like and disliked the same at the same time
//         const userDislikedThePost = post.dislike.includes(currentUser.id)
//         if(userDislikedThePost){
//             // remove the user from the dislike array
//             const tempArray = post.dislike.filter((userId) => userId !== currentUser.id)
//             // update the post
//             await db.post.update({
//                 where: {
//                     id:  postId
//                 },
//                 data: {
//                     dislike: tempArray
//                 }
//             })
//         }

//         revalidatePath("/")

//         return {sucess: `${userAlreadyLiked ? "post has been unliked" : "post has been liked"}`}
//     }
//     catch(error: any){
//         if(error instanceof Error){
//             return {error: error.message}
//         }
//         return {error: "Something went wrong"}
//     }
// }

// export async function Dislike(postId: string) {
//     try{
//         // Find the post
//         const post = await db.post.findFirst({
//             where: {
//                 id: postId
//             }
//         })
//         if(!post) {
//             return {error: "Post not found"}
//         }
//         // Get the current user
//         const currentUser = await getCurrentUser()
//         if(!currentUser){
//             return {error: "Please login to perform this action"}
//         }
//         // Check If the user Already disliked the post
//         const userAlreadyDisliked = post.dislike.includes(currentUser.id)
//         let tempArray
//         if(userAlreadyDisliked){
//             // remove the user from the Dislike array
//             tempArray = post.dislike.filter((userId) => userId !== currentUser.id)
//         }
//         else {
//             // Add the user's id to the Dislike array
//             tempArray = [...post.dislike, currentUser.id]
//         }
//         // update the post
//         await db.post.update({
//             where: {
//                 id: postId
//             },
//             data: {
//                 dislike: tempArray
//             }
//         })
//         // Check if The user has liked the post. because one user can not like and dislike the same post at the same time. 
//         const userLikedThePost = post.like.includes(currentUser.id)
//         if(userLikedThePost){
//             // remove the user's id from the like array
//             const tempArray = post.like.filter((userId) => userId !== currentUser.id)
//             // update the like array of the post
//             await db.post.update({
//                 where: {
//                     id: postId
//                 },
//                 data: {
//                     like: tempArray
//                 }
//             })
//         }

//         revalidatePath("/")

//         return {success: `${userAlreadyDisliked ? "post has been unDiisliked" : "post has been Disliked"}`}

//     }
//     catch(error){
//         if(error instanceof Error){
//             return {error: error.message}
//         }
//         return {error: "Something went wrong"}
//     }
// }

// RE-USABLE CODE
export async function LikeDislike({type, postId}: {type: string, postId: string}) {
    try{
        // Find the post
        const post = await db.post.findFirst({
            where: {
                id: postId
            }
        })
        if(!post) {
            return {error: "Post not found"}
        }
        // Get the current user
        const currentUser = await getCurrentUser()
        if(!currentUser){
            return {error: "Please login to perform this action"}
        }
        if(type === LIKE_DISLIKE.like){
            // Check If the user Already liked the post
            const userAlreadyLiked = post.like.includes(currentUser.id)
            let tempArray
            if(userAlreadyLiked){
                tempArray = post.like.filter((userId) => userId !== currentUser.id)
            }
            else{
                // Add the current user's Id to the like array of the post
                tempArray = [...post.like, currentUser.id]
            }
            // update the post
            await db.post.update({
                where: {
                    id: postId
                },
                data: {
                    like: tempArray
                },
            })
            // Check If the user disliked the post. because one user can not like and disliked the same at the same time
            const userDislikedThePost = post.dislike.includes(currentUser.id)
            if(userDislikedThePost){
                // remove the user from the dislike array
                const tempArray = post.dislike.filter((userId) => userId !== currentUser.id)
                // update the post
                await db.post.update({
                    where: {
                        id:  postId
                    },
                    data: {
                        dislike: tempArray
                    }
                })
            }
        }
        else if(type === LIKE_DISLIKE.dislike){
            // Check If the user Already disliked the post
            const userAlreadyDisliked = post.dislike.includes(currentUser.id)
            let tempArray
            if(userAlreadyDisliked){
                // remove the user from the Dislike array
                tempArray = post.dislike.filter((userId) => userId !== currentUser.id)
            }
            else {
                // Add the user's id to the Dislike array
                tempArray = [...post.dislike, currentUser.id]
            }
            // update the post
            await db.post.update({
                where: {
                    id: postId
                },
                data: {
                    dislike: tempArray
                }
            })
            // Check if The user has liked the post. because one user can not like and dislike the same post at the same time. 
            const userLikedThePost = post.like.includes(currentUser.id)
            if(userLikedThePost){
                // remove the user's id from the like array
                const tempArray = post.like.filter((userId) => userId !== currentUser.id)
                // update the like array of the post
                await db.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        like: tempArray
                    }
                })
            }
        }
        else if(type === LIKE_DISLIKE.flag){
            // Check if the post a maximum of 3 flags already
            const NumberOfFlags = post.flag.length
            if(NumberOfFlags >= 3){
                // delete the post because 4 users flagged it, most probably it's unAppropriate post
                await db.post.delete({
                    where: {
                        id: postId
                    }
                })
            }
            else{
                // Check if the user has already flagged the post
                const userAlreadyFlagged = post.flag.includes(currentUser.id)
                let tempArray
                if(userAlreadyFlagged){
                    // remove the current user from the array
                    tempArray = post.flag.filter((userId) => userId !== currentUser.id)
                }
                else {
                    // add the user to the flag array of the post
                    tempArray = [...post.flag, currentUser.id]
                }
                // update the post
                await db.post.update({
                    where: {
                        id: postId
                    },
                    data: {
                        flag: tempArray
                    }
                })
            }
        }

        revalidatePath("/")

        return {success: "Done"}
    }
    catch(error: any){
        return {error: "Database connection failed."}
    }
}
export async function revalidateTheHomePage(){
    try{
        revalidatePath("/")
    }
    catch(error: any){
        return {error: "something went"}
    }
}
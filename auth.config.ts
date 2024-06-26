import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import  Credentials from "next-auth/providers/credentials"
import { AuthenticationFormSchema } from "./src/lib/validation"
import type { NextAuthConfig } from "next-auth"
import { getUserByEmail } from "./src/actions"
import { DATABASE_CONNECTION_ERROR_MESSAGE } from "@/constants"


export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            async authorize(credentials){
                const validatedFields = AuthenticationFormSchema.safeParse(credentials)
                if(validatedFields.success){
                    const {email, password} = validatedFields.data
                    const result = await getUserByEmail(email)
                    if(result.error) throw Error(DATABASE_CONNECTION_ERROR_MESSAGE.at(0))
                    const user = result.success
                    /**
                     * If the user has been registered before they should have the "hashedPassword" field in their data
                     */
                    if(!user || !user.hashedPassword) return null
                    const bcrypt = require("bcrypt");
                    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword)
                    if(passwordsMatch) return user
                }
                return null
            },
        })
    ],

} satisfies NextAuthConfig
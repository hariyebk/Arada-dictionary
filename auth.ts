import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "@/db"
import authConfig from "./auth.config"
import { CREDENTIALS_PROVIDER } from "@/constants";
import { getUserById } from "@/actions";


export const { handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    callbacks: {
        async signIn({user, account}){
            // Allow all providers to pass without email verfication except credentials
            if(account?.provider !== CREDENTIALS_PROVIDER) return true
            const isMyMail = user.email === process.env.MY_EMAIL
            const existingUser = await getUserById(user.id!)
            if(isMyMail){
                if(!existingUser?.hashedPassword || !existingUser?.emailVerified) return false
            }
            return true
        },
        async session({ session, token}){
            
            if(session.user?.email && token.sub){
                /**
                 * Adding the id of the user to the current session.
                 */
                session.user.id = token.sub
            }
            return session
        },
        async jwt({ token}){
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
});
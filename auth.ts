import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./src/db"
import authConfig from "./auth.config"

export const { handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    callbacks: {
        async session({ session, token}){
            if(session.user && token.sub){
                /**
                 * Adding the ID of the user into the current session
                 * @type {string}
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
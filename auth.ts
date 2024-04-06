import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { db } from "./src/db"
import authConfig from "./auth.config"

export const { handlers: {GET, POST}, auth, signIn, signOut} = NextAuth({
    callbacks: {
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
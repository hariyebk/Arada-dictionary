import { db } from "@/db"
import { getVerificationTokenByEmail } from "@/db/verification-token"
import {v4 as uuidv4} from "uuid"

export async function generateToken(email: string){
    /**
     * generating a universal unique identifier token
     */
    const token = uuidv4()
    /**
     * Email verification token will expire after one hour
     */
    const expires = new Date(new Date().getTime() + 3600 * 1000)
    try{
        /**
         * check if there is an existing token before we generate a new token for the email.
         * If there is a token , we delete it,
         */
        const existingToken = await getVerificationTokenByEmail(email)
        if(existingToken){
            await db.verificationToken.delete({
                where: {
                    id: existingToken.id
                }
            })
        }
        const newVerificationToken = await db.verificationToken.create({
            data: {
                email,
                token,
                expires
            }
        })

        return newVerificationToken
    }
    catch(error: any){
        throw Error(error)
    }
}
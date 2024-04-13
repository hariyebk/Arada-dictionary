import {Resend} from "resend"

interface SendEmailVerificationProps {
    email: string,
    token: string,
    name: string
}
const resend = new Resend(process.env.RESEND_API_KEY)
const domain = process.env.NEXTAUTH_URL
export async function SendEmailVerification({email, token, name}: SendEmailVerificationProps){
    const confirmationLink = `${domain}/verification?token=${token}`
    const {data, error} = await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Confirm your email address",
        html: `
        <div>
            <h3> Dear ${name} </h3>

            <p> Welcome to Arada Dictionary! To get started, please click the link below to verify your email address: </p>

            <a href="${confirmationLink}"> click here </a>
        </div>
        `
    })
    if(error){
        throw Error("Failed to send the email for some reason")
    }
}
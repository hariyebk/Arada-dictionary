"use client"

import { Input} from "@/components";
import { useEffect, useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { FiMessageCircle } from "react-icons/fi";
import { VscGithubInverted } from "react-icons/vsc";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast"
import { AuthenticationFormSchema } from "@/lib/validation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ClipLoader from "react-spinners/ClipLoader";
import { Login, Register, SocialLogin } from "@/actions";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isNew, setIsNew] = useState(false)
    const [emailMessage, setEmailMessage] = useState("")

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [isNew])

    const form = useForm<z.infer<typeof AuthenticationFormSchema>>({
        resolver: zodResolver(AuthenticationFormSchema),
        defaultValues: {
            firstname: isNew ? "" : undefined,
            lastname: isNew ? "" : undefined,
            username: isNew ? "" : undefined,
            email: "",
            password: "",
            confirmPassword: isNew ? "" : undefined
        },
    })

    function handleToggle(){
        isNew ? setIsNew(false) : setIsNew(true)
    }

    async function onSubmit(values: z.infer<typeof AuthenticationFormSchema>){
        setIsLoading(true)
        try{
            if(isNew){
                const result = await Register(values)
                if(result?.error){
                    return toast.error(result.error)
                }
                if(result?.success){
                    setEmailMessage(result?.success)
                }
            }
            else {
                const result = await Login(values)
                if(result?.error){
                    return toast.error(result.error)
                }
                if(result?.email){
                    form.reset()
                    return setEmailMessage(result.email)
                }
                toast.success("You have Logged in")
            }
        }
        catch(error: any){
            console.log(error)
            toast.error(error)
        }
        finally{
            setIsLoading(false)
        }
    }
    async function handleSocialLogin(action: string){
        try{
            await SocialLogin(action)
        }
        catch(error: any){
            toast.error(error || "something went wrong")
        } 
    }


    return (
        <section className="min-h-screen">
            <div className="flex items-center justify-center container">
                <div className="flex flex-col flex-1 items-center">
                    <h3 className="text-2xl max-md:text-xl text-black font-palanquin uppercase"> {isNew ? "Create your Account" : "Sign in to your Account"} </h3>
                    <div className="mt-10 w-[500px] max-sm:w-[350px] h-auto bg-white shadow-xl max-md:rounded-lg rounded-md pt-10 pb-20 pl-10 md:pl-20">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-3">
                                {isNew && <div>
                                {/* FIRST Name */}
                                <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                <FormItem className="flex flex-col items-start gap-3">
                                    <FormLabel> First Name </FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isLoading} {...field} placeholder="abebe" className="w-[350px] max-md:w-[270px] text-stone-500 py-5 rounded-md bg-white border border-gray-400 focus-visible:outline-none focus-visible:ring-white" />
                                    </FormControl>
                                    <FormMessage className="-pt-5 formError" />
                                </FormItem>
                                )}
                                />
                                {/* LAST NAME */}
                                <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                <FormItem className="mt-4 flex flex-col items-start gap-3">
                                    <FormLabel> Last Name </FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isLoading} {...field} placeholder="balcha" className="w-[350px] max-md:w-[270px] text-stone-500 py-3 rounded-md bg-white border border-gray-400 focus-visible:outline-none focus-visible:ring-white" />
                                    </FormControl>
                                    <FormMessage className="-pt-5 formError" />
                                </FormItem>
                                )}
                                />
                                {/* USERNAME */}
                                <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                <FormItem className="mt-4 flex flex-col items-start gap-3">
                                    <FormLabel> Username </FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isLoading} {...field} className="w-[350px] max-md:w-[270px] text-stone-500 py-5 rounded-md bg-white border border-gray-400 focus-visible:outline-none focus-visible:ring-white" />
                                    </FormControl>
                                    <FormMessage className="-pt-5 formError" />
                                </FormItem>
                                )}
                                />
                                </div>
                                }
                                {/* EMAIL */}
                                <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem className="mt-4 flex flex-col items-start gap-3">
                                    <FormLabel> Email address </FormLabel>
                                    <FormControl>
                                        <Input type="text" disabled={isLoading} {...field} placeholder="mamo@example.com" className="w-[350px] max-md:w-[270px] text-stone-500 py-5 rounded-md bg-white border border-gray-400 focus-visible:outline-none focus-visible:ring-white" />
                                    </FormControl>
                                    <FormMessage className="-pt-5 formError" />
                                </FormItem>
                                )}
                                />
                                {/* PASSWORD */}
                                <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                <FormItem className="mt-4 flex flex-col items-start gap-3" >
                                    <FormLabel> Password </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-between w-[350px] max-md:w-[270px] rounded-md border border-gray-400 pr-5 py-1 pl-3">
                                            <Input type={`${showPassword ? "text" : "password"}`} disabled={isLoading} {...field} placeholder="*********" className="bg-white focus:outline-none focus-visible:ring-white border-none" />
                                            {showPassword ? <button type="button" onClick={() => setShowPassword(false)}> 
                                                <GoEye className="w-4 h-4" />
                                            </button> : <button type="button" onClick={() => setShowPassword(true)}> 
                                                <GoEyeClosed className="w-4 h-4" />
                                            </button>
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage className="-pt-5 formError" />
                                </FormItem>
                                )}
                                />
                                {isNew && <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                <FormItem className="mt-4 flex flex-col items-start gap-3" >
                                    <FormLabel> Confirm Password </FormLabel>
                                    <FormControl>
                                        <div className="flex items-center justify-between w-[350px] max-md:w-[270px] rounded-md border border-gray-400 pr-5 py-1 pl-3">
                                            <Input type={`${showConfirmPassword ? "text" : "password"}`} disabled={isLoading} {...field} placeholder="**********" className="bg-white focus:outline-none focus-visible:ring-white border-none" />
                                            { showConfirmPassword ?  <button type="button" onClick={() => setShowConfirmPassword(false)}> 
                                                <GoEye className="w-4 h-4" /> 
                                            </button>:  <button type="button" onClick={() => setShowConfirmPassword(true)}> 
                                                <GoEyeClosed className="w-4 h-4" /> 
                                            </button>
                                            }
                                        </div>
                                    </FormControl>
                                    <FormMessage className="formError" />
                                </FormItem>
                                )}
                                />
                                }
                                {emailMessage && (
                                    <div className="mt-5 mr-16 bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-black">
                                        <FiMessageCircle className="h-4 w-4 text-emerald-500" />
                                        <p>{emailMessage}</p>
                                    </div>
                                )}
                                <button type="submit" className="mt-10 w-[350px] max-md:w-[270px] bg-primary px-5 py-2 rounded-sm text-white font-semibold font-palanquin"> {isLoading ? (
                                    <ClipLoader
                                    color="#ffffff"
                                    loading={true}
                                    size={24}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                    className="mt-2"
                                    />
                                ) : isNew ? "Sign up" : "Sign in" } </button>
                            </form>
                        </Form>
                        {!isNew ? <>
                            <div className="mt-10 max-md:mt-14 flex items-center gap-3">
                                <hr className="border border-t-gray-400 w-[90px] max-md:w-[60px]" />
                                <p className="text-stone-500"> or countinue with </p>
                                <hr className="border border-t-gray-400 w-[100px] max-md:w-[60px]" />
                            </div>
                            <div className="mt-10 flex items-start gap-20">
                                <button onClick={() => handleSocialLogin("github")} disabled={isLoading} className="px-16 max-md:px-10 py-2 rounded-md border border-gray-300 disabled:cursor-not-allowed">
                                    <VscGithubInverted className="w-6 h-6" />
                                </button>
                                <button onClick={() => handleSocialLogin("google")} disabled={isLoading} className="px-10 max-md:px-10 py-2 rounded-md border border-gray-300 disabled:cursor-not-allowed">
                                    <FcGoogle className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="mt-10 flex items-center gap-6 max-md:gap-10 max-md:text-xs text-stone-500 font-palanquin">
                                <p> New To Arada dictionary ?. </p>
                                <button onClick={handleToggle} className="underline"> Create new account </button>
                            </div>
                        </>
                        :  <div className="flex items-center justify-center mt-16 mr-14 ">
                            <button onClick={handleToggle} disabled={isLoading} className="w-[250px] max-md:w-[170px] px-3 py-2 disabled:cursor-not-allowed max-md:text-sm text-stone-500 text-center border border-gray-400 rounded-md" aria-disabled={isLoading}> 
                                Go back to Login 
                            </button>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

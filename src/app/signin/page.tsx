"use client"

import { Input, Label } from "@/components";
import { useState } from "react";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FcGoogle } from "react-icons/fc";
import { VscGithubInverted } from "react-icons/vsc";

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <section className="min-h-screen">
            <div className="flex items-center justify-center container">
                <div className="flex flex-col flex-1 items-center">
                    <h3 className="text-2xl text-black font-palanquin uppercase"> Sign in to your Account </h3>
                    <div className="mt-10 w-[500px] h-auto bg-white shadow-xl rounded-md pt-10 pb-20 pl-20">
                        <form>
                            <div className="flex flex-col items-start gap-5">
                                <Label> Email address </Label>
                                <Input type="text" placeholder="mamo@example.com" className="w-[350px] text-stone-500 py-5 rounded-md border border-gray-400 focus-visible:outline-none focus-visible:ring-white" />
                            </div>
                            <div className="mt-8 flex flex-col items-start gap-5">
                                <Label> Password </Label>
                                <div className="flex items-center justify-between w-[350px] rounded-md border border-gray-400 pr-5 p-1">
                                    <Input type={`${showPassword ? "text" : "password"}`} placeholder="" className="focus:outline-none focus-visible:ring-white border-none" />
                                    {showPassword ? <button type="button" onClick={() => setShowPassword(false)}> <GoEye className="w-4 h-4" /> </button> : <button type="button" onClick={() => setShowPassword(true)}> <GoEyeClosed className="w-4 h-4" /> </button>
                                    }
                                </div>
                            </div>
                            <button type="submit" className="mt-10 w-[350px] bg-primary px-5 py-2 rounded-sm text-white font-semibold font-palanquin"> Sign in </button>
                        </form>
                        <div className="mt-10 flex items-center gap-3">
                            <hr className="border border-t-gray-400 w-[90px]" />
                            <p className="text-stone-500"> or countinue with </p>
                            <hr className="border border-t-gray-400 w-[100px]" />
                        </div>
                        <div className="mt-10 mx-4 flex items-center gap-10">
                            <button className="px-14 py-2 rounded-md border border-gray-300">
                                <VscGithubInverted className="w-6 h-6" />
                            </button>
                            <button className="px-14 py-2 rounded-md border border-gray-300">
                                <FcGoogle className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

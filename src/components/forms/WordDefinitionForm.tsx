"use client"

import { WordDefinitionFormSchema } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import {toast} from "react-hot-toast"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Select, SelectValue, SelectContent, SelectItem, SelectLabel, SelectTrigger, Input, Textarea } from "../"
import { cities } from "@/constants"
import ClipLoader from "react-spinners/ClipLoader"
import { CreatePost} from "@/actions"
import { useRouter } from "next/navigation"
import { AMAHRIC_FONT } from "@/utils/font"

export default function WordDefinitionForm(){

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm<z.infer<typeof WordDefinitionFormSchema>>({
        resolver: zodResolver(WordDefinitionFormSchema),
        defaultValues: {
            word: "",
            definition: "",
            examples: "",
            spokenArea: ""
        },
    })

    async function onSubmit(values: z.infer<typeof WordDefinitionFormSchema>){
        setIsLoading(true)
        try{
            const result = await CreatePost(values)
            if(result?.error){
                console.log(result.error)
                return toast.error(result.error)
            }
            if(result.success?.id){
                console.log(result.success)
                toast.success("post created successfully")
                router.push("/")
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

    return (
        <section className="max-lg:w-full max-lg:flex items-center justify-center max-sm:px-6">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={`${AMAHRIC_FONT.className} max-md:ml-6`}>
                    {/* WORD */}
                    <FormField
                    control={form.control}
                    name="word"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-3">
                        <FormLabel className="label"> Word </FormLabel>
                        <FormControl>
                            <Input type="text" disabled={isLoading} placeholder="Type the word" {...field} className="md:w-[420px] max-sm:w-[250px] sm:w-[300px] mt-5 border border-gray-600 focus-visible:outline-none focus-visible:ring-white no-autofill max-md:py-3 md:py-7 px-3" />
                        </FormControl>
                        <FormMessage className="formError" />
                    </FormItem>
                    )}
                    />
                    {/* DEFINITION */}
                    <FormField
                    control={form.control}
                    name="definition"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-3 mt-10">
                        <FormLabel className="label"> What does it mean ? </FormLabel>
                        <FormControl>
                        <Textarea {...field} disabled={isLoading} placeholder="Type the meaning of the word here" className="md:w-[420px] max-sm:w-[250px] sm:w-[300px] h-[100px] mt-6 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-5 max-sm:px-3 sm:px-4" />
                        </FormControl>
                        <FormMessage className="formError" />
                    </FormItem>
                    )}
                    />
                    {/* EXAMPLES */}
                    <FormField
                    control={form.control}
                    name="examples"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-3 mt-8">
                        <FormLabel className="label"> Provide some examples for context </FormLabel>
                        <FormControl>
                            <Textarea {...field} disabled={isLoading}  placeholder="use comma to separate each examples" className="md:w-[420px] max-sm:w-[250px] sm:w-[300px] h-[100px] mt-6 md:mt-8 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-5 max-sm:px-3 sm:px-4" />
                        </FormControl>
                        <FormMessage className="formError" />
                    </FormItem>
                    )}
                    />
                    {/* SPOKEN AREA */}
                    <FormField
                    control={form.control}
                    name="spokenArea"
                    render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-3 mt-10">
                        <FormLabel className="label"> Mostly used Area ? </FormLabel>
                        <Select onValueChange= {field.onChange}>
                            <FormControl className="md:w-[420px] max-sm:w-[250px] sm:w-[300px] border border-gray-600 focus:border-none focus-visible:outline-none focus-visible:ring-white max-sm:py-3 sm:py-4 md:py-6 px-3">
                                <SelectTrigger {...field} disabled={isLoading}>
                                    <SelectValue placeholder="Select the city" className=""/>
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-teritiary">
                                {cities.map((city) => {
                                    return (
                                        <SelectItem key={city} value={city}> {city} </SelectItem>
                                    )
                                })}
                            </SelectContent>
                        </Select>
                        <FormMessage className="formError" />
                    </FormItem>
                    )}
                    />
                    <button type="submit" className="mt-16 md:w-[420px] max-sm:w-[200px] sm:w-[300px] rounded-md bg-primary text-base text-white font-palanquin font-semibold px-4 py-2">
                        {isLoading ? (
                            <ClipLoader
                            color="#ffffff"
                            loading={true}
                            size={24}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                            className="mt-2"
                            />
                        ) : "Submit"}
                    </button>
                </form>
            </Form>
        </section>
    )
}

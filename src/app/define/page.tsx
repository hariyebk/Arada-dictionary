
import { cities } from "@/constants";
import Image from "next/image";
import {Input, Label, Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue, Textarea} from "@/components"
import Contribution from "/public/contribution.png"

export default function Define() {
    return (
        <section className="min-h-screen mb-36">
            <div className="mr-20 ml-16 flex items-start justify-center gap-28">
                <div>
                    <div className="ml-20 flex flex-col items-start gap-6">
                        <Label className="text-xl text-center font-palanquin"> Thanks for your contributions 🎉 </Label>
                        <Label className="text-xl text-center font-palanquin"> You're helping people communicate better.</Label>
                    </div>
                    <Image src={Contribution} alt="contribution-image" width={600} height={600} className="max-lg:hidden" />
                </div>
                <form className="flex items-center justify-center">
                    {/* <Label> Thanks for your contributions! You're helping people communicate better. </Label> */}
                    <div>
                        <div>
                            <Label className="label"> Word </Label>
                            <Input name="word" type="text" placeholder="Type the word" className="w-[380px] mt-5 border border-gray-600 focus-visible:outline-none focus-visible:ring-white  py-7 px-3" />
                        </div>
                        <div className="mt-12">
                            <Label className="label"> What does it mean ? </Label>
                            <Textarea name="definition" placeholder="Type the meaning of the word here" className="w-[420px] h-[100px] mt-6 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-5 px-4" />
                        </div>
                        <div className="mt-8">
                            <Label className="label"> Provide some examples for context </Label>
                            <Textarea name="examples" placeholder="use comma to separate each examples" className="w-[420px] h-[100px] mt-6 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-5 px-4" />
                        </div>
                        <div className="mt-10">
                            <Label className="label"> In Which city is this word predominantly used? </Label>
                            <Select name="spokenArea">
                                <SelectTrigger className="w-[380px] mt-8 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-6 px-3">
                                    <SelectValue placeholder="Select the city" className=""/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {cities.map((city) => {
                                            return (
                                                <SelectItem value={city}> {city} </SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="mt-12">
                            <Label className="label"> Add some tages related to the word </Label>
                            <Textarea name="tags" placeholder="use comma to separate each tags" className="w-[420px] h-[100px] mt-7 border border-gray-600 focus-visible:outline-none focus-visible:ring-white py-5 px-4" />
                        </div>
                        <button className="mt-16 w-[250px] rounded-md bg-primary text-base text-white font-palanquin font-semibold px-4 py-2">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </section>
    )
}

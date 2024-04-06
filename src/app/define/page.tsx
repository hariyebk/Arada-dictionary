import Image from "next/image";
import Contribution from "/public/contribution.png"
import { Label } from "@/components";
import WordDefinitionForm from "@/components/forms/WordDefinitionForm";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

export default async function Define(){
    const session = await auth()
    if(!session?.user){
        redirect("/signin")
    }

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
                <WordDefinitionForm />
            </div>
        </section>
    )
}

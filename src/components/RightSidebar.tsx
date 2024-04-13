
import Image from "next/image";
import Avatar from "/public/avatar.png"

export default async function RightSidebar() {

    return (
        <section className={`mx-5 mt-3 max-xl:hidden`}>
            <div className={`w-[250px] h-auto py-10 px-4 bg-secondary shadow-xl rounded-md`}>
                <h4 className="text-main text-center text-lg font-palanquin"> People to follow </h4>
                <div className="px-12 mt-3">
                    <div className="mt-6 flex items-center justify-start gap-3">
                        <Image src={Avatar} alt="prfolie-image" className="rounded-full w-8 h-8" />
                        <p className="text-base text-black font-palanquin"> @haribk </p>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-3">
                        <Image src={Avatar} alt="prfolie-image" className="rounded-full w-8 h-8" />
                        <p className="text-base text-black font-palanquin"> @haribk </p>
                    </div>
                    <div className="mt-6 flex items-center justify-start gap-3">
                        <Image src={Avatar} alt="prfolie-image" className="rounded-full w-8 h-8" />
                        <p className="text-base text-black font-palanquin"> @haribk </p>
                    </div>
                    <p className="mt-8 ml-2 text-lg text-black font-palanquin"> Coming soon </p>
                </div>
            </div>
        </section>
    )
}

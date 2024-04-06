import Image from "next/image";
import Avatar from "/public/avatar.png"

export default async function RightSidebar() {
    return (
        <section className='ml-24 mr-5 mt-3'>
            <div className="w-[270px] h-auto py-10 px-4 bg-secondary shadow-xl rounded-md">
                <h4 className="text-main text-center text-lg font-palanquin"> People to follow </h4>
                <div className="px-14 mt-3">
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
                </div>
            </div>
        </section>
    )
}

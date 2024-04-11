import Link from "next/link";
import { FaYoutube, FaFacebook, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default async function Footer() {
    return (
        <section id="footer" className="mt-48 relative inset-x-0 bottom-0 max-md:pb-10 pb-16">
            <div className="h-[100px] bg-inherit md:py-10 md:px-20 border border-t-gray-600 border-b-0 border-opacity-35">
                <div className="py-7 flex max-md:flex-col items-center justify-between max-md:gap-10 text-lg max-sm:tet-base text-black font-palanquin lg:px-10">
                    <div>
                        <p> @ 2024 &nbsp; Arada dictionary Inc. &nbsp; All rights reserved </p>
                    </div>
                    <div className="lg:ml-36 flex items-center gap-6">
                        <Link href="https://youtube.com"> <FaYoutube className="w-6 h-6 text-main" /> </Link>
                        <Link href="https://twitter.com/Hariyebk"> <FaXTwitter className="w-6 h-6 text-main" /> </Link>
                        <Link href="https://www.facebook.com/eyosi.natnael/"> <FaFacebook className="w-6 h-6  text-main" /> </Link>
                        <Link href="https://t.me/haribk"> <FaTelegram className="w-6 h-6  text-main" /> </Link>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

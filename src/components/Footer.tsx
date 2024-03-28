
import Link from "next/link";
import { FaYoutube, FaFacebook, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="mt-48 pb-10 absolute inset-x-0 bottom-0">
            <div className="h-[100px] bg-inherit py-10 px-20 border border-t-gray-600 border-opacity-35">
                <div className="py-7 flex items-center justify-between text-lg text-black font-palanquin px-20">
                    <div>
                        <p> @ 2024 &nbsp; Arada dictionary Inc. &nbsp; All rights reserved </p>
                    </div>
                    <div className="ml-36 flex items-center gap-6">
                        <Link href=""> <FaYoutube className="w-6 h-6 text-main" /> </Link>
                        <Link href=""> <FaXTwitter className="w-6 h-6 text-main" /> </Link>
                        <Link href=""> <FaFacebook className="w-6 h-6  text-main" /> </Link>
                        <Link href=""> <FaTelegram className="w-6 h-6  text-main" /> </Link>
                    </div>
                </div>
            </div>
        </section>
    ) 
}

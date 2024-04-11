// "use client"

import Image from "next/image";
import Avatar from "/public/avatar.png"
// import { useEffect, useState } from "react";

export default async function RightSidebar() {
    // const [isSticky, setIsSticky] = useState(false)

    // useEffect(() => {
    //     const handleScroll = () => {
    //         // Gets the distance from the top of the document to the top of the footer
    //         const footerOffset = document.getElementById("footer")!.offsetTop;
    //         console.log(document.getElementById("footer"))
    //         // Gets the total length of the view port
    //         const windowHeight = window.innerHeight;
    //         // Gets the current scroll position
    //         const scrollPosition: number = window.screenY;
    //         console.log(`footerOffset ${typeof footerOffset}`, `windowHeight ${typeof windowHeight}`, `scrollPosition ${typeof scrollPosition}`)
    //         // Measures  how far the footer is from the top of the document.
    //         const gap = footerOffset - windowHeight
    //         if ( gap === 3090) {
    //             setIsSticky(false);
    //         } 
    //         else {
    //             setIsSticky(true);
    //         }
    //     };
    //     // Listening to the scroll event, then calling the handleScroll function
    //     window.addEventListener("scroll", handleScroll);
    //     // Clean up function, to remove unNecessary event listening after the component is unMounted
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //     };
    // }, [])

    return (
        <section className={`ml-24 mr-5 mt-3 max-xl:hidden`}>
            <div className={`w-[270px] h-auto py-10 px-4 bg-secondary shadow-xl rounded-md`}>
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

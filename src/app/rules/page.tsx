import { rules } from "@/constants";

export default function Rules() {
    return (
        <section className="min-h-screen">
            <div className="max-md:w-full md:max-w-[650px] lg:max-w-[750px] xl:max-w-[900px] max-sm:px-8 sm:px-10 mx-auto">
                <h2 className="text-3xl max-md:text-2xl text-black text-center font-palanquin"> Community Guidelines </h2>
                <ul className="list-decimal max-sm:mt-10 sm:mt-14 max-sm:px-3 sm:px-7 md:px-10">
                    {rules.map((element) => {
                        return (
                            <div key={element.rule} className="flex flex-wrap items-center justify-between mt-7">
                                <li className="text-lg text-black font-palanquin"> {element.rule} </li>
                                <p className="aboutP text-base pt-3 xl:leading-7"> {element.description} </p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

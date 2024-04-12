import { rules } from "@/constants";

export default function Rules() {
    return (
        <section className="min-h-screen">
            <div className="lg:w-[700px] max-sm:w-[310px] sm:w-[470px] md:w-[600px] mx-auto">
                <h2 className="text-3xl max-md:text-2xl text-black text-center font-palanquin"> Community Guidelines </h2>
                <ul className="list-decimal mt-20 max-md:ml-3 ml-7">
                    {rules.map((element) => {
                        return (
                            <div key={element.rule} className="flex flex-wrap items-center justify-between mt-7">
                                <li className="text-lg text-black font-palanquin"> {element.rule} </li>
                                <p className="aboutP text-base pt-5"> {element.description} </p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

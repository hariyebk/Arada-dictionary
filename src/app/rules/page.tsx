import { rules } from "@/constants";

export default function Rules() {
    return (
        <section className="min-h-screen">
            <div className="flex flex-col flex-1 items-center justify-center pt-10">
                <h2 className="text-3xl text-black font-palanquin"> Community Guidelines </h2>
                <ul className="list-decimal w-[700px] mt-16 ml-7">
                    {rules.map((element) => {
                        return (
                            <div key={element.rule} className="flex flex-wrap items-center justify-between mt-8">
                                <li className="text-xl text-black font-medium font-palanquin"> {element.rule} </li>
                                <p className="aboutP pt-6"> {element.description} </p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

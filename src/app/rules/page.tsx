import { rules } from "@/constants";

export default function Rules() {
    return (
        <section className="min-h-screen">
            <div className="flex flex-col flex-1 items-center justify-center pt-7">
                <h2 className="text-3xl text-black font-palanquin"> Community Guidelines </h2>
                <ul className="list-decimal w-[700px] mt-10 ml-7">
                    {rules.map((element) => {
                        return (
                            <div key={element.rule} className="flex flex-wrap items-center justify-between mt-5">
                                <li className="text-lg text-black font-palanquin"> {element.rule} </li>
                                <p className="aboutP text-base pt-3"> {element.description} </p>
                            </div>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

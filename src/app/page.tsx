import {Card, SearchHeader, Filters, RightSidebar} from "@/components"

export default function Home() {
  return (
    <main className="min-h-screen">
        <SearchHeader />
        <div className="w-full mb-28 mt-20 px-10 flex items-start">
            <Filters />
            <Card />
            <RightSidebar />
        </div>
    </main>
  )
}

import { FecthAllPosts } from "@/actions"
import {Card, SearchHeader, Filters, RightSidebar} from "@/components"

export default async function Home({searchParams}: {searchParams?: {city?: string, search?: string} }) {
  const posts = await FecthAllPosts()
  let queriedPosts = posts
  if(searchParams?.city){
    queriedPosts = queriedPosts.filter((post) => post.spokenArea === searchParams.city?.replaceAll("_", " "))
  }
  else if(searchParams?.search){
    queriedPosts = queriedPosts.filter((post) => post.word === searchParams.search)
  }

  return (
    <main className="min-h-screen">
        <SearchHeader />
        <div className="w-full mb-28 mt-16 max-md:mt-10 px-10 flex items-start">
            <Filters />
            <div className="flex flex-1 flex-col items-center">
                {queriedPosts.length === 0 ?
                <div className="flex items-center mt-28 ml-5">
                    <p className="text-xl text-black font-palanquin"> No Posts found that match your query 😔 </p>
                </div>
                :
                queriedPosts.map((post, i) => {
                  return (
                    <div key={post.id} className={`${i !== 0 ? "mt-16" : "mt-3"}`}>
                      <Card post={post} />
                    </div>
                  )
                })
                }
            </div>
            <RightSidebar />
        </div>
    </main>
  )
}

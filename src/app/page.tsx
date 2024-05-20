import { FecthAllPosts } from "@/actions"
import {Card, SearchHeader, Filters, RightSidebar} from "@/components"
import Pagination from "@/components/Pagination"

export default async function Home({searchParams}: {searchParams?: {city?: string, search?: string, page?: string} }) {
  const city = searchParams?.city ? searchParams.city?.replaceAll("_", " ") : null
  const search = searchParams?.search ? searchParams.search : null
  const page = searchParams?.page ? parseInt(searchParams.page) : 1

  const {posts, count, totalQueriedResults} = await FecthAllPosts({pageNumber: page, city, search})

  return (
    <main className="min-h-screen w-full container ">
        <SearchHeader />
        <div className="mb-48 mt-10 flex items-start max-xl:justify-center xl:justify-start gap-7">
            <Filters />
            <div className="flex items-start xl:gap-20 xl:ml-16">
                {posts.length === 0 ?
                <div className="flex items-center mt-28 ml-5 xl:ml-36">
                    <p className="text-xl max-sm:text-base text-black font-palanquin"> No Posts found that match your query 😔 </p>
                </div>
                :
                <div className="flex flex-col items-start">
                    {posts.map((post, i) => {
                      return (
                        <div key={post.id} className={`${i !== 0 ? "mt-16" : "mt-3"}`}>
                            <Card post={post} />
                        </div>
                      )
                    })
                    }
                    <Pagination totalResults={searchParams?.city || searchParams?.search ? totalQueriedResults : count} />
                </div>
                }
                <RightSidebar />
            </div>
        </div>
    </main>
  )
}

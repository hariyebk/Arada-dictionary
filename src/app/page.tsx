import { FecthAllPosts } from "@/actions"
import {Card, SearchHeader, Filters, RightSidebar} from "@/components"
import Pagination from "@/components/Pagination"

export default async function Home({searchParams}: {searchParams?: {city?: string, search?: string, page?: string} }) {
  const city = searchParams?.city ? searchParams.city?.replaceAll("_", " ") : null
  const search = searchParams?.search ? searchParams.city?.replaceAll("_", " ") : null
  const page = searchParams?.page ? parseInt(searchParams.page) : 1

  const {posts, count, totalQueriedResults} = await FecthAllPosts({pageNumber: page, city, search})

  return (
    <main className="min-h-screen w-full container max-sm:pr-10">
        <SearchHeader />
        <div className="mb-48 mt-16 max-md:mt-10 md:px-5 flex items-start">
            <Filters />
            <div className="flex flex-1 flex-col items-center xl:items-start">
                {posts.length === 0 ?
                <div className="flex items-center mt-28 ml-5 xl:ml-36">
                    <p className="text-xl max-sm:text-base text-black font-palanquin"> No Posts found that match your query 😔 </p>
                </div>
                :
                posts.map((post, i) => {
                  return (
                    <div key={post.id} className={`${i !== 0 ? "mt-16" : "mt-3"}`}>
                      <Card post={post} />
                    </div>
                  )
                })
                }
                <Pagination totalResults={searchParams?.city || searchParams?.search ? totalQueriedResults : count} />
            </div>
            <RightSidebar />
        </div>
    </main>
  )
}

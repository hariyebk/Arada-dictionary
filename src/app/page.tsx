import { FecthAllPosts } from "@/actions"
import {Card, SearchHeader, Filters, RightSidebar} from "@/components"

export default async function Home() {
  const posts = await FecthAllPosts()
  return (
    <main className="min-h-screen">
        <SearchHeader />
        <div className="w-full mb-28 mt-16 px-10 flex items-start">
            <Filters />
            <div className="flex flex-1 flex-col items-center">
                {posts.map((post, i) => {
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

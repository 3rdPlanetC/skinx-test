import { useEffect, useState } from "react"
import Unauthorization from "../Unauthorization"
import PostItem from "./PostItem"
import { PostState } from "@/app/interfaces/post"
// import { sortBy } from "sort-by-typescript"
import Cookies from "cookies"
import { API_URL, API_V1 } from "@/config"
import { GetServerSideProps } from "next"
export const getServerSideProps = (async (context) => {
    const cookies = new Cookies(context.req, context.res)
    const access_token = cookies.get("access_token")
    const res = await fetch(`${API_URL}${API_V1}/post`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
        }
    })
    let posts
    if (res.status === 200) {
        const data = await res.json()
        posts = data
    } else {
        posts = []
    }
    return { props: { posts } }
}) satisfies GetServerSideProps<{ posts: PostState[] }>

export default ({ posts }: { posts: PostState[] }) => {
    const [postsState, setPosts] = useState<PostState[]>(posts)
    // methods
    return (
        <div className="max-w-screen-lg mx-auto my-4">
            <div className="grid grid-cols-4 gap-4">
                {postsState.map((post, index) => (
                    <PostItem key={index} props={post}></PostItem>
                ))}
            </div>
        </div>
    )
}

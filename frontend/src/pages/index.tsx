import PostComponent from "@/app/components/Post/Post"
import "@/app/globals.css"
import { PostState, PostTag } from "@/app/interfaces/post"
import { sortBy } from "sort-by-typescript"
import Cookies from "cookies"
import { API_URL, API_V1 } from "@/config"
import { GetServerSideProps } from "next"
import Unauthorization from "@/app/components/Unauthorization"
import React, { useState } from "react"

export const getServerSideProps = (async (context) => {
    const cookies = new Cookies(context.req, context.res)
    const access_token = cookies.get("access_token")
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
    }
    const resPost = await fetch(`${API_URL}${API_V1}/post`, {
        method: "GET",
        headers
    })
    const resTag = await fetch(`${API_URL}${API_V1}/post/tag/all`, {
        method: "GET",
        headers
    })
    let posts, tags
    if (resPost.status === 200 && resTag.status === 200) {
        const postData = await resPost.json()
        const tagData = await resTag.json()
        posts = postData
        tags = tagData
    } else {
        posts = []
        tags = []
    }
    return { props: { posts, tags, isAuthorized: !!access_token } }
}) satisfies GetServerSideProps<{ posts: PostState[] }>

export default ({
    posts,
    tags,
    isAuthorized
}: {
    posts: PostState[]
    tags: PostTag[]
    isAuthorized: boolean
}) => {
    const [postsState, setPosts] = useState<PostState[]>(posts)
    const [tagsState, setTags] = useState<PostTag[]>(tags)
    const [searchContent, setSearchContent] = useState("")
    const PostsMemo = React.memo(PostComponent)
    // methods
    function sortPost(typeSort: string) {
        switch (typeSort) {
            case "id":
                posts.sort((a, b) => a.id - b.id)
                break
            case "title":
                posts.sort((a, b) =>
                    a.title.toLowerCase().localeCompare(b.title.toLowerCase())
                )
                break
            case "content":
                posts.sort((a, b) =>
                    a.content
                        .toLowerCase()
                        .localeCompare(b.content.toLowerCase())
                )
                break
            case "postedBy":
                posts.sort((a, b) =>
                    a.postedBy
                        .toLowerCase()
                        .localeCompare(b.postedBy.toLowerCase())
                )
                break
            case "postedAt":
                posts.sort((a, b) =>
                    a.postedAt
                        .toLowerCase()
                        .localeCompare(b.postedAt.toLowerCase())
                )
                break
            case "createdAt":
                posts.sort(sortBy("createdAt"))
                break
            case "updatedAt":
                posts.sort(sortBy("updatedAt"))
                break
        }
        setPosts([...posts])
    }

    function sortPostByTag(tagName: string) {
        const newPosts = posts.filter((post) => {
            return post.tags.find((item) => item.name === tagName)
        })
        setPosts([...newPosts])
    }

    async function searchPostTitle(search: string) {
        const testBouncing = debounce((search: string) => {
            const newPosts = posts.filter((post) => {
                return post.title.search(search) > 0
            })
            setPosts([...newPosts])
            // await fetchSearchContentQuery(search)
        }, 1000)
        testBouncing(search)
    }

    async function fetchSearchContentQuery(search: string) {
        // try {
        //     const res = await fetch(
        //         `/api/post/search/query?content=${search}`,
        //         {
        //             method: "GET"
        //         }
        //     )
        //     const data = await res.json()
        //     setPosts([...data])
        // } catch (error) {
        //     console.log("fetchSearchContentQuery Error : ", error)
        // }
    }

    function debounce(callback: Function, delay: number) {
        let timer: NodeJS.Timeout | undefined | number
        return function (wording: string) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(wording)
            }, delay)
        }
    }
    return (
        <div className="max-w-screen-lg mx-auto">
            {isAuthorized ? (
                <div>
                    <div className="bg-yellow-300 my-4 grid-cols-4 grid">
                        {/* sort */}
                        <div className="p-2 flex">
                            <p className="mr-2 text-black">post sort : </p>
                            <select
                                className="text-black"
                                onChange={(e) => sortPost(e.target.value)}
                            >
                                {Object.keys(posts[0]).map((key) => (
                                    <option key={key} value={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* search by tag */}
                        <div className="p-2 flex">
                            <p className="mr-2 text-black">tags sort : </p>
                            <select
                                className="text-black"
                                onChange={(e) => sortPostByTag(e.target.value)}
                            >
                                {tags.length > 0 &&
                                    tagsState.map((tag, index) => (
                                        <option key={index} value={tag.name}>
                                            {tag.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        {/* all */}
                        <div className="p-2 flex">
                            <p className="mr-2 text-black">all : </p>
                            <button
                                className="text-black px-4 bg-white"
                                onClick={() => setPosts([...posts])}
                            >
                                All
                            </button>
                        </div>
                        {/* search by title without bouncing */}
                        <div className="p-2 flex">
                            <p className="mr-2 text-black">search title : </p>
                            <input
                                type="text"
                                className="text-black"
                                onChange={(e) =>
                                    searchPostTitle(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <PostsMemo posts={postsState}></PostsMemo>
                </div>
            ) : (
                <Unauthorization></Unauthorization>
            )}
        </div>
    )
}

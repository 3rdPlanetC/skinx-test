import { PostState } from "@/app/interfaces/post"
import Unauthorization from "@/app/components/Unauthorization"
import { GetServerSideProps } from "next"
import Cookies from "cookies"
import { API_URL, API_V1 } from "@/config"
import "@/app/globals.css"

export const getServerSideProps = (async (context) => {
    const cookies = new Cookies(context.req, context.res)
    const access_token = cookies.get("access_token")
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`
    }
    const params = context.req.url?.split("/post")[1]
    const resPost = await fetch(`${API_URL}${API_V1}/post${params}`, {
        method: "GET",
        headers
    })
    let post
    if (resPost.status === 200) {
        const postData = await resPost.json()
        console.log("postData : ", postData)
        post = postData
    } else {
        post = {}
    }
    return { props: { post, isAuthorized: !!access_token } }
}) satisfies GetServerSideProps<{ post: PostState }>

export default ({
    post,
    isAuthorized
}: {
    post: PostState
    isAuthorized: boolean
}) => {
    return (
        <div>
            {isAuthorized ? (
                <div className="border border-red-400">
                    <div className="w-full relative mb-5">
                        <div className="mb-4">
                            <h3 className="sm:s-h6 md:l-h6 font-medium my-2">
                                {post.title}
                            </h3>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: post.content
                                }}
                            />
                            <p>Post By : {post.postedBy}</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Unauthorization></Unauthorization>
            )}
        </div>
    )
}

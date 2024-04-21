"use client"

import Link from "next/link"

type PostState = {
    id: number
    title: string
    content: string
    postedAt: string
    postedBy: string
}

export default ({ props }: { props: PostState }) => {
    return (
        <Link href={"/post/" + props.id} className="border border-red-400">
            <div className="w-full relative mb-5">
                <div className="mb-4">
                    <h3 className="sm:s-h6 md:l-h6 font-medium my-2">
                        {props.title}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

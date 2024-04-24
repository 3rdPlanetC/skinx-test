export type PostState = {
    id: number
    title: string
    content: string
    postedAt: string
    postedBy: string
    tags: PostTag[]
    createdAt: string
    updatedAt: string
}

export type PostTag = {
    id: number
    name: string
    createdAt: string
    updatedAt: string
}
import PostData from './posts.json'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    for (let postData of PostData) {
        await prisma.post.create({
            data: {
                title: postData.title,
                content: postData.content,
                postedAt: postData.postedAt,
                postedBy: postData.postedBy,
                tags: {
                    create: postData.tags.map((tagItem) => {
                        return {
                            tag: {
                                connectOrCreate: {
                                    where: {
                                        name: tagItem
                                    },
                                    create: {
                                        name: tagItem
                                    }
                                }
                            }
                        }
                    })
                }
            }
        })
    }
}

main().catch(e => {
    console.log("error : ", e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect()
})
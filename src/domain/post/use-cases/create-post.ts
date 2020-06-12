import { CreatePostInput } from '@graphql/types'
import { db } from '@modules/db'

const createPost = async (userId: number, input: CreatePostInput) => {
  const post = await db.post.create({
    data: {
      createdBy: { connect: { id: userId } },
      navItem: { connect: { id: input.navItemId } },
      title: input.title,
      content: input.content,
      publishedAt: input.publishedAt,
    },
    include: {
      navItem: true,
    },
  })

  return {
    post,
  }
}

export { createPost }

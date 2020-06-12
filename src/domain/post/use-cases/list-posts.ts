import { PostsInput, Maybe } from '@graphql/types'
import { db } from '@modules/db'

const listPosts = async (input: PostsInput) => {
  const where = input?.navItemId
    ? {
        navItemId: input.navItemId,
      }
    : {}

  const posts = await db.post.findMany({
    where,
    orderBy: {
      updatedAt: 'desc',
    },
    take: 50,
    include: {
      navItem: true,
    },
  })

  return {
    items: posts,
  }
}

export { listPosts }

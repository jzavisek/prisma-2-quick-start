import { UpdatePostInput } from '@graphql/types'
import { db } from '@modules/db'

const updatePost = async (input: UpdatePostInput) => {
  const post = await db.post.update({
    data: {
      navItem: { connect: { id: input.navItemId } },
      title: input.title,
      content: input.content,
      publishedAt: input.publishedAt,
    },
    where: {
      id: input.id,
    },
  })

  return {
    post,
  }
}

export { updatePost }

import { PostInput } from '@graphql/types'
import { db } from '@modules/db'

const getPost = async (input: PostInput) => {
  const post = await db.post.findOne({
    where: {
      id: input.id,
    },
    include: {
      navItem: true,
    },
  })

  return {
    post,
  }
}

export { getPost }

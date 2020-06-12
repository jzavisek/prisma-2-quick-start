import { DeletePostInput } from '@graphql/types'
import { db } from '@modules/db'

const deletePost = async (input: DeletePostInput) => {
  const post = await db.post.delete({
    where: {
      id: input.id,
    },
  })

  return {
    post,
  }
}

export { deletePost }

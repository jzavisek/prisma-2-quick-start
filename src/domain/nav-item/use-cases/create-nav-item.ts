import { CreateNavItemInput } from '@graphql/types'
import { db } from '@modules/db'

const createNavItem = async (userId: number, input: CreateNavItemInput) => {
  const position = (await db.navItem.count()) + 1
  const navItem = await db.navItem.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      position,
      ...input,
    },
  })

  return {
    navItem,
  }
}

export { createNavItem }

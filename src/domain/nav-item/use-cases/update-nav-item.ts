import { UpdateNavItemInput } from '@graphql/types'
import { db } from '@modules/db'

const updateNavItem = async (input: UpdateNavItemInput) => {
  const navItem = await db.navItem.update({
    data: input,
    where: {
      id: input.id,
    }
  })

  return {
    navItem
  }
}

export {
  updateNavItem
}

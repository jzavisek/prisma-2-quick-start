import { DeleteNavItemInput } from '@graphql/types'
import { db } from '@modules/db'

const deleteNavItem = async (input: DeleteNavItemInput) => {
  const navItem = await db.navItem.delete({
    where: {
      id: input.id,
    },
  })

  // Move following nav items
  const position = navItem.position
  await db.raw(
    `UPDATE "navItems"
     SET "position" = "position" + 1
     WHERE "position" > ${position};`
  )

  return {
    navItem,
  }
}

export { deleteNavItem }

import { SetNavItemPositionInput } from '@graphql/types'
import { db } from '@modules/db'
import { ErrorCode } from '@modules/errors'

const setNavItemPosition = async (input: SetNavItemPositionInput) => {
  const navItem = await db.navItem.findOne({
    where: {
      id: input.id,
    },
  })

  if (!navItem) {
    throw new Error(ErrorCode.NOT_FOUND)
  }

  const originalPosition = navItem.position
  const newPosition = input.position
  if (originalPosition !== newPosition) {
    if (newPosition < originalPosition) {
      await db.raw(
        `UPDATE "navItems"
         SET "position" = "position" + 1
         WHERE "position" >= ${newPosition}
          AND "position" < ${originalPosition}
          AND "id" != ${input.id};`
      )
    } else {
      await db.raw(
        `UPDATE "navItems"
         SET "position" = "position" - 1
         WHERE "position" > ${originalPosition}
          AND "position" <= ${newPosition}
          AND "id" != ${input.id};`
      )
    }
  }

  const result = await db.navItem.update({
    data: {
      position: newPosition,
    },
    where: {
      id: input.id,
    },
  })

  return {
    navItem: result,
  }
}

export { setNavItemPosition }

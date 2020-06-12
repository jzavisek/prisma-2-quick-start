import { db } from '@modules/db'

const listNavItems = async () => {
  const navItems = await db.navItem.findMany({
    orderBy: {
      position: 'asc',
    },
  })

  return {
    items: navItems,
  }
}

export { listNavItems }

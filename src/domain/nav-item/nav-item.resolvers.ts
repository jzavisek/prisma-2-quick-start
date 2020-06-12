import {
  MutationCreateNavItemArgs,
  MutationUpdateNavItemArgs,
  MutationDeleteNavItemArgs,
  MutationSetNavItemPositionArgs,
} from '@graphql/types'
import { createNavItem } from '@domain/nav-item/use-cases/create-nav-item'
import { Context } from '@graphql/context'
import { listNavItems } from '@domain/nav-item/use-cases/list-nav-items'
import { updateNavItem } from '@domain/nav-item/use-cases/update-nav-item'
import { deleteNavItem } from '@domain/nav-item/use-cases/delete-nav-item'
import { setNavItemPosition } from '@domain/nav-item/use-cases/set-nav-item-position'

export default {
  Query: {
    navItems: () => listNavItems(),
  },
  Mutation: {
    createNavItem: async (_: any, args: MutationCreateNavItemArgs, ctx: Context) =>
      createNavItem(ctx.state.userId!, args.input),
    updateNavItem: async (_: any, args: MutationUpdateNavItemArgs, ctx: Context) =>
      updateNavItem(args.input),
    deleteNavItem: async (_: any, args: MutationDeleteNavItemArgs, ctx: Context) =>
      deleteNavItem(args.input),
    setNavItemPosition: async (_: any, args: MutationSetNavItemPositionArgs, ctx: Context) =>
      setNavItemPosition(args.input),
  },
}

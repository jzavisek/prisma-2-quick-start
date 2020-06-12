import { Context } from '@graphql/context'
import { verifyUser } from '@modules/utils/jwt'

const getUserId = async (context: Context) => {
  const authHeader = context.req.headers.authorization
  if (authHeader) {
    return await verifyUser(authHeader)
  }

  return null
}

const authMiddleware = async (
  resolve: any,
  root: any,
  args: any,
  context: Context,
  info: any
) => {
  const userId = await getUserId(context)
  if (userId) {
    context.state = context.state ?? {}
    context.state.userId = Number(userId)
  }
  return resolve(root, args, context, info)
}

export {
  authMiddleware
}

import { allow, deny, rule, shield } from 'graphql-shield'
import { Context } from '@graphql/context'

const rules = {
  isAuthenticatedUser: rule()((parent, args, context: Context) => {
    const userId = context.state?.userId
    return Boolean(userId)
  }),
}

const permissionsMiddleware = shield(
  {
    Query: {
      '*': deny,
      navItems: allow,
      post: allow,
      posts: allow,
    },
    Mutation: {
      '*': deny,
      signUp: allow,
      signIn: allow,
      createPost: rules.isAuthenticatedUser,
      updatePost: rules.isAuthenticatedUser,
      deletePost: rules.isAuthenticatedUser,
      createNavItem: rules.isAuthenticatedUser,
      updateNavItem: rules.isAuthenticatedUser,
      deleteNavItem: rules.isAuthenticatedUser,
      setNavItemPosition: rules.isAuthenticatedUser,
    },
    User: allow,
    SignUpPayload: allow,
    SignInPayload: allow,
    NavItemPayload: allow,
    PostsPayload: allow,
    PostPayload: allow,
    NavItem: allow,
    NavItemsPayload: allow,
    Post: allow,
  },
  {
    fallbackRule: deny,
    fallbackError: new Error('Not authorized'),
    allowExternalErrors: true,
  }
)

export { permissionsMiddleware }

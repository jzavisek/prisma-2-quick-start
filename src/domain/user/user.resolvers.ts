import { signUp } from '@domain/user/use-cases/sign-up'
import { signIn } from '@domain/user/use-cases/sign-in'
import { MutationSignUpArgs, MutationSignInArgs } from '@graphql/types'
import { Context } from '@graphql/context'

export default {
  Query: {
  },
  Mutation: {
    signUp: (_: any, args: MutationSignUpArgs) => signUp(args.input),
    signIn: async (_: any, args: MutationSignInArgs, ctx: Context) => await signIn(args.input),
  },
}

import {
  MutationCreatePostArgs,
  MutationUpdatePostArgs,
  MutationDeletePostArgs,
  QueryPostsArgs,
  QueryPostArgs,
} from '@graphql/types'
import { Context } from '@graphql/context'
import { createPost } from '@domain/post/use-cases/create-post'
import { updatePost } from '@domain/post/use-cases/update-post'
import { deletePost } from '@domain/post/use-cases/delete-post'
import { listPosts } from '@domain/post/use-cases/list-posts'
import { getPost } from '@domain/post/use-cases/get-post'

export default {
  Query: {
    posts: async (_: any, args: QueryPostsArgs, ctx: Context) => listPosts(args.input),
    post: async (_: any, args: QueryPostArgs, ctx: Context) => getPost(args.input),
  },
  Mutation: {
    createPost: async (_: any, args: MutationCreatePostArgs, ctx: Context) =>
      createPost(ctx.state.userId!, args.input),
    updatePost: async (_: any, args: MutationUpdatePostArgs, ctx: Context) =>
      updatePost(args.input),
    deletePost: async (_: any, args: MutationDeletePostArgs, ctx: Context) =>
      deletePost(args.input),
  },
}

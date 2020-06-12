export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type CreateNavItemInput = {
  title: Scalars['String'];
  path: Scalars['String'];
};

export type DeleteNavItemInput = {
  id: Scalars['Int'];
};

export type UpdateNavItemInput = {
  id: Scalars['Int'];
  title: Scalars['String'];
  path: Scalars['String'];
};

export type SetNavItemPositionInput = {
  id: Scalars['Int'];
  position: Scalars['Int'];
};

export type NavItem = {
  __typename?: 'NavItem';
  id: Scalars['Int'];
  title: Scalars['String'];
  path: Scalars['String'];
  position: Scalars['Int'];
};

export type NavItemPayload = {
  __typename?: 'NavItemPayload';
  navItem: NavItem;
};

export type NavItemsPayload = {
  __typename?: 'NavItemsPayload';
  items: Array<NavItem>;
};

export type Query = {
  __typename?: 'Query';
  navItems: NavItemsPayload;
  post: PostPayload;
  posts?: Maybe<PostsPayload>;
};


export type QueryPostArgs = {
  input: PostInput;
};


export type QueryPostsArgs = {
  input?: Maybe<PostsInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNavItem: NavItemPayload;
  createPost: PostPayload;
  deleteNavItem: NavItemPayload;
  deletePost: PostPayload;
  setNavItemPosition: NavItemPayload;
  signIn: SignInPayload;
  signUp: SignUpPayload;
  updateNavItem: NavItemPayload;
  updatePost: PostPayload;
};


export type MutationCreateNavItemArgs = {
  input: CreateNavItemInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationDeleteNavItemArgs = {
  input: DeleteNavItemInput;
};


export type MutationDeletePostArgs = {
  input: DeletePostInput;
};


export type MutationSetNavItemPositionArgs = {
  input: SetNavItemPositionInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateNavItemArgs = {
  input: UpdateNavItemInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};

export type CreatePostInput = {
  navItemId: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
  publishedAt?: Maybe<Scalars['Date']>;
};

export type UpdatePostInput = {
  id: Scalars['Int'];
  navItemId: Scalars['Int'];
  title: Scalars['String'];
  content: Scalars['String'];
  publishedAt?: Maybe<Scalars['Date']>;
};

export type DeletePostInput = {
  id: Scalars['Int'];
};

export type PostsInput = {
  navItemId: Scalars['Int'];
};

export type PostInput = {
  id: Scalars['Int'];
};

export type PostsPayload = {
  __typename?: 'PostsPayload';
  items?: Maybe<Array<Maybe<Post>>>;
};

export type PostPayload = {
  __typename?: 'PostPayload';
  post?: Maybe<Post>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  title: Scalars['String'];
  content?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  updatedAt?: Maybe<Scalars['Date']>;
  navItem?: Maybe<NavItem>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type SignInPayload = {
  __typename?: 'SignInPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type SignUpPayload = {
  __typename?: 'SignUpPayload';
  user: User;
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


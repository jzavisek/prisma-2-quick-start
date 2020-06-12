# Prisma 2.0 Quick Start

## Steps to run the project

- `make infra` - to start local Postgres database
- `make prisma` - to generate Prisma client
- `make types` - to generate GraphQL types
- `make migrate-plan` - generate database migration plan
- `make migrate-up` - apply database migration
- `make dev` - start local development server
- Go to http://localhost:3001/graphql

## Other commands

- `make studio` - Run Prisma admin dashboard

## What is included in the example

- Auto-generated GraphQL types
- Script for working with Prisma
- GraphQL Shield
- Basic authorization middleware
- Prettier
- Available queries & mutations:
  - `signUp` - Newly created users are in `pending` state and they have to be activated first (set status to `active`)
  - `signIn` - Only activated users can sign in
  - `createNavItem` - Authenticated users only (use Authorization header, e.g. `Authorization: Bearer eyJhbGciOiJIUzU...`)
  - `updateNavItem` - Authenticated users only
  - `setNavItemPosition` - Authenticated users only
  - `deleteNavItem` - Authenticated users only
  - `navItems` - Public query
  - `createPost` - Authenticated users only
  - `updatePost` - Authenticated users only
  - `deletePost` - Authenticated users only
  - `posts` - Public query
  - `post` - Public query

## Prisma missing parts

- Transactions - https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/transactions

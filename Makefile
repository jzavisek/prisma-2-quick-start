SHELL	:= sh
PATH	:= node_modules/.bin:$(PATH)
PACKAGE_VERSION := $(shell node -p "require('./package.json').version")
TS := ts-node --transpile-only -r tsconfig-paths/register
PRISMA_SCHEMA_PATH := ./src/prisma/schema.prisma

include .env

dev:
	$(TS) ./src/graphql/server.ts

infra:
	docker-compose up -d
infra-stop:
	docker-compose down

studio:
	DATABASE_URL="${DATABASE_URL}" npx @prisma/cli studio --experimental --schema $(PRISMA_SCHEMA_PATH)

prisma:
	npx @prisma/cli generate --schema $(PRISMA_SCHEMA_PATH)
types:
	graphql-codegen

migrate-plan:
	DATABASE_URL="${DATABASE_URL}" npx @prisma/cli migrate save --name 'init' --experimental --schema $(PRISMA_SCHEMA_PATH)
migrate-up:
	DATABASE_URL="${DATABASE_URL}" npx @prisma/cli migrate up --experimental --schema $(PRISMA_SCHEMA_PATH)

prettify:
	prettier --write src/**/*.{ts,gql}

clean:
	rm -rf dist

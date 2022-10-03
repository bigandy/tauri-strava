dev-migration:
	npx prisma migrate dev

run-migration:
	npx prisma migrate deploy

generate-schema: generate-schema-app


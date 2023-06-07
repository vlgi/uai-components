# Docker commands
up:
	docker compose up -d
	docker compose exec -it app bash

down:
	docker compose down

enter:
	docker compose exec -it app bash


# Stories commands

## Remove internal stories only. Used on CI.
rm-int-stories:
	find -name *.internal.stories.* -delete
	find -name *.internal.mdx -delete

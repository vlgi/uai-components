up:
	docker compose up -d
	docker compose exec -it app bash

down:
	docker compose down

enter:
	docker compose exec -it app bash

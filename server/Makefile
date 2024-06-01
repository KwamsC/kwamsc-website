up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build --remove-orphans

down-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml down -v && docker image prune -f


down-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml down -v

down:
	docker-compose down

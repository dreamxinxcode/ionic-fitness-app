build:
	docker-compose up -d --build

start:
	docker compose up -d

shell:
	docker exec -it fitness_api bash

migrate:
	docker-compose exec web python manage.py migrate

create_superuser:
	docker-compose exec web python manage.py createsuperuser
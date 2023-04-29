build:
	docker-compose up -d --build

start:
	docker compose up -d

shell:
	docker exec -it fitness_api bash

db_shell:
	docker exec -it fitness_db bash

migrate:
	docker-compose exec web python manage.py migrate

dump:
	docker-compose exec web python manage.py dumpdata > dump.json

create_superuser:
	docker-compose exec web python manage.py createsuperuser

delete_db_container:
	docker stop fitness_db
	docker rm fitness_db
# Getting Started

## API

`$ cd api`

`$ python3 -m venv env`

`$ source env/bin/activate`

`$ pip3 install -r requirements.txt`

`$ ./manage.py runserver 0.0.0.0:8000`

## Mobile

`$ make install`

`$ make run`

# Admin Credentials

email: example@example.com

password: password

# Concepts

## Authentication

- JWT authentication
- HTTPInterceptor
- Routes protected with `guards`

## Inputs

- Input data validation with `validators`

## Misc

- Local storage

# Token URLs

## Generate token
```
curl \ 
  -X POST \   
  -H "Content-Type: application/json" \   
  -d '{"email": "example@example.com", "password": "password"}' \   
  http://localhost:8000/token/
```
```
{
"access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU",
  "refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImNvbGRfc3R1ZmYiOiLimIMiLCJleHAiOjIzNDU2NywianRpIjoiZGUxMmY0ZTY3MDY4NDI3ODg5ZjE1YWMyNzcwZGEwNTEifQ.aEoAYkSJjoWH1boshQAaTkf8G3yn0kapko6HFRt7Rh4"
}
```

## Protected route
```
curl \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNDU2LCJqdGkiOiJmZDJmOWQ1ZTFhN2M0MmU4OTQ5MzVlMzYyYmNhOGJjYSJ9.NHlztMGER7UADHZJlxNG0WSi22a2KaYSfd1S-AuT7lU" \
  http://localhost:8000/api/workouts/
```

## Refresh token
```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImNvbGRfc3R1ZmYiOiLimIMiLCJleHAiOjIzNDU2NywianRpIjoiZGUxMmY0ZTY3MDY4NDI3ODg5ZjE1YWMyNzcwZGEwNTEifQ.aEoAYkSJjoWH1boshQAaTkf8G3yn0kapko6HFRt7Rh4"}' \
  http://localhost:8000/api/token/refresh/
```

```
{"access":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3BrIjoxLCJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiY29sZF9zdHVmZiI6IuKYgyIsImV4cCI6MTIzNTY3LCJqdGkiOiJjNzE4ZTVkNjgzZWQ0NTQyYTU0NWJkM2VmMGI0ZGQ0ZSJ9.ekxRxgb9OKmHkfy-zs1Ro_xs1eMLXiR17dIDBVxeT-w"}
```

# Semantic Versioning

# Android

`curl -d '{"os":"android"}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/version/`

`{"id":1,"os":"android","version":"1.0.0"}`

# iOS

`curl -d '{"os":"ios"}' -H "Content-Type: application/json" -X POST http://localhost:8000/api/version/`

`{"id":2,"os":"ios","version":"1.0.0"}`

# Users

Username	First Name	Last Name	Country	City	Email	Password
jdoe123	John	Doe	USA	New York	johndoe@example.com	mypassword123
asmith	Alice	Smith	Canada	Toronto	alice.smith@example.com	p@ssw0rd!
bwilliams	Bob	Williams	Australia	Sydney	bwilliams@example.com	secret123
klee	Kevin	Lee	USA	San Francisco	kevin.lee@example.com	letmein
schan	Sarah	Chan	China	Beijing	sarah.chan@example.com	password123
gjones	George	Jones	UK	London	george.jones@example.com	mysecretpass
jwang	Jennifer	Wang	China	Shanghai	jennifer.wang@example.com	iloveyou
rsmith	Robert	Smith	USA	Chicago	robert.smith@example.com	password123
tlee	Tiffany	Lee	South Korea	Seoul	tiffany.lee@example.com	qwerty123
mjohnson	Michael	Johnson	Canada	Vancouver	michael.johnson@example.com	hello123
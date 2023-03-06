FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1

WORKDIR /project

COPY requirements.txt /project/
RUN pip3 install -r requirements.txt

COPY . /project/
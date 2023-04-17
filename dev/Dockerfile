FROM python:3.9-slim-buster

ENV TZ 'UTC'

RUN apt-get update
RUN apt-get install -y nano htop wait-for-it

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY app/requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

WORKDIR /app

FROM python:3.9-slim-buster

# Keeps Python from generating .pyc files in the container, Turns off buffering for easier container logging
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Настрока времени
ENV TZ='UTC'
ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN apt-get install -y  wait-for-it

COPY requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

COPY deploy/entrypoint.sh /entrypoint.sh
RUN chmod -R 755 /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]

COPY app /app
WORKDIR /app

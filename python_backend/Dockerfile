FROM python:3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY . /app

WORKDIR /app/conf
RUN pip install -r requirements.txt
COPY ./src/* /app/src/

WORKDIR /app/src/
EXPOSE 8080

RUN chmod +x startup.sh
CMD ["sh","startup.sh"]
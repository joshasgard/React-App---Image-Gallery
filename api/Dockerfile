FROM python:3.10

WORKDIR /app

ENV FLASK_ENV=development

EXPOSE 5050

COPY Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pip install -r requirements.txt

COPY . ./

CMD [ "python", "main.py" ]
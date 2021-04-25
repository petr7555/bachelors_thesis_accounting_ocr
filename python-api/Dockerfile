FROM python:3.8-slim

RUN apt update
RUN apt install --reinstall build-essential -y
RUN apt install python3-opencv -y
RUN apt install wget -y
RUN apt clean

WORKDIR /app

ADD requirements.txt /app
RUN pip install --user -r requirements.txt

ADD nlp_model.py /app
ADD image_model.py /app
ADD service.py /app
ADD emoji_db.py /app

CMD [ "python", "./service.py" ]

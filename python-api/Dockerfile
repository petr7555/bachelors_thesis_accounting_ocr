FROM python:3.8-slim

RUN apt update
RUN apt install --reinstall build-essential -y
RUN apt install python3-opencv -y
RUN apt install wget -y
RUN apt clean

WORKDIR /app

ADD requirements.txt /app
RUN pip install -r requirements.txt

ADD nlp_model.py /app
ADD image_model.py /app
ADD service.py /app
ADD emoji_db.py /app

# Download the model in advance to the directory where Magnitude expects it
RUN wget -q -P ~/.magnitude http://magnitude.plasticity.ai/word2vec/medium/GoogleNews-vectors-negative300.magnitude

CMD [ "python", "./service.py" ]

FROM node:0.11

ENV GITHUB_USERNAME bodokaiser
ENV GITHUB_PASSWORD e1ea43c4ea245fcd6ced12d4611850e591460549

ADD . /usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 80

CMD ["node", "--harmony", "lib"]

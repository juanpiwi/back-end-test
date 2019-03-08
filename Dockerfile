FROM node:10.13.0

LABEL maintainer="ferrarijuanp@gmail.com"
RUN mkdir back-end-test
WORKDIR /back-end-test
ADD . /back-end-test
RUN npm install
CMD npm start
FROM harbor.aisjz.com/library/node-oracledb:10.9.0
MAINTAINER hanguang hanguang@asiainfo.com

RUN mkdir -p /usr/local/pms-mobile-web
RUN mkdir -p /usr/local/pms-mobile-web/logs

COPY bin /usr/local/pms-mobile-web/bin
COPY client /usr/local/pms-mobile-web/client
COPY public /usr/local/pms-mobile-web/public
COPY routes /usr/local/pms-mobile-web/routes
COPY *.json /usr/local/pms-mobile-web/
COPY *.js /usr/local/pms-mobile-web/
copy *.html /usr/local/pms-mobile-web/

WORKDIR /usr/local/pms-mobile-web

RUN export HOSTNAME=`hostname`

RUN npm install
CMD npm run service

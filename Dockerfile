FROM registry.cn-beijing.aliyuncs.com/jlf-space/nginx:1.20

ARG artifict

RUN echo $artifict

ADD $artifict /usr/share/nginx/dist.tgz

RUN tar -xvzf /usr/share/nginx/dist.tgz -C /usr/share/nginx/html --strip-components=1
#COPY ./dist/ /usr/share/nginx/html

COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 3005

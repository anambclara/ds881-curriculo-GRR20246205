FROM ruby:alpine

RUN apk update && apk add --no-cache build-base gcc cmake git

WORKDIR /srv/jekyll

RUN gem install bundler jekyll

EXPOSE 8080



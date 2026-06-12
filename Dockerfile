FROM ruby:3.3-alpine

RUN apk add --no-cache build-base git nodejs npm

WORKDIR /srv/jekyll

COPY Gemfile Gemfile.lock ./
RUN gem install bundler -v 4.0.14 \
    && bundle config set without "development" \
    && bundle install

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 8080

CMD ["bundle", "exec", "jekyll", "serve", "--host", "0.0.0.0", "--port", "8080", "--baseurl", "", "--livereload", "--force_polling"]

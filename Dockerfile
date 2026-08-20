FROM php:8.2-cli

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer /usr/bin/composer /usr/bin/composer

RUN apt-get update \
    && apt-get install -y libpq-dev libzip-dev unzip \
    && docker-php-ext-install pgsql pdo_pgsql zip

WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts

COPY . .

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "-t", "."]
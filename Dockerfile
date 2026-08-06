# Imagen oficial de PHP con Apache
FROM php:8.3-apache

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    && docker-php-ext-install pgsql pdo_pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Directorio de trabajo
WORKDIR /var/www/html

# Copiar composer primero (mejora el cache)
COPY composer.json composer.lock ./

# Instalar dependencias
RUN composer install \
    --no-dev \
    --optimize-autoloader

# Copiar el resto del proyecto
COPY . .

# Permisos
RUN chown -R www-data:www-data /var/www/html

EXPOSE 80
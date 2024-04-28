FROM php:8.0-apache

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip unzip

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql

RUN setcap "cap_net_bind_service=+ep" /usr/local/bin/php

RUN wget http://pear.php.net/go-pear.phar && \
    php go-pear.phar && \
    pecl channel-update pecl.php.net

RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sSL https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

ARG WWWGROUP=www-data
RUN groupadd --force -g $(id -g $WWWGROUP) sail && \
    useradd -ms /bin/bash --no-user-group -g $(id -g $WWWGROUP) -u 1337 sail

COPY . /var/www/html/

RUN composer install && \
    npm install && \
    npm run prod

RUN chown -R www-data:www-data /var/www/html/storage && \
    chmod -R 775 /var/www/html/storage

RUN a2enmod rewrite

EXPOSE 8000

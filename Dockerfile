FROM php:8.2-apache

WORKDIR /var/www/html

RUN apt-get update && \
    apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev zip unzip libcap2-bin wget curl gnupg2 && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd pdo pdo_mysql && \
    setcap "cap_net_bind_service=+ep" /usr/local/bin/php && \
    wget http://pear.php.net/go-pear.phar && \
    php go-pear.phar && \
    pecl channel-update pecl.php.net

RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 14AA40EC0831756756D7F66C4F4EA0AAE5267A6C && \
    apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E5267A6C && \
    echo "deb https://ppa.launchpadcontent.net/ondrej/php/ubuntu jammy main" > /etc/apt/sources.list.d/ondrej-php.list

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource.gpg && \
    echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_16.x bullseye main" > /etc/apt/sources.list.d/nodesource.list && \
    apt-get update && \
    apt-get install -y nodejs

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN curl -sSL https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

ARG WWWGROUP=www-data
RUN groupadd --force -g $(getent group $WWWGROUP | cut -d: -f3) sail && \
    useradd -ms /bin/bash --no-user-group -g $(getent group $WWWGROUP | cut -d: -f3) -u 1337 sail

COPY . /var/www/html/

RUN chown -R www-data:www-data /var/www/html/storage && \
    chmod -R 775 /var/www/html/storage && \
    mkdir -p /var/www/html/public/build && \
    chown -R www-data:www-data /var/www/html/public/build && \
    chmod -R 775 /var/www/html/public/build

RUN composer install && \
    npm install && \
    npm run build

RUN a2enmod rewrite

EXPOSE 8000

FROM php:8.2-fpm

# 安装系统依赖
RUN apt-get update -y \
    && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libpq-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# 设置工作目录
WORKDIR /var/www

# 复制 Laravel 项目到容器中
COPY . .

# 安装 Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# 设置文件权限
RUN chown -R www-data:www-data /var/www

# 暴露 PHP-FPM 端口
EXPOSE 9000

CMD ["php-fpm"]

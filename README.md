# Тестовое задание - REST API с PostgreSQL

## Описание
REST API сервис на Node.js для атомарного увеличения числового значения в PostgreSQL базе данных.

## Предварительные требования
- Node.js
- PostgreSQL
- npm

## Установка и настройка базы данных

bash

Удаление существующей БД и пользователя (если есть)
dropdb --if-exists sk_example_db
dropuser --if-exists sk_example_user
Создание нового пользователя и БД
createuser sk_example_user -P
createdb -O sk_example_user sk_example_db
Инициализация таблицы
psql -U sk_example_user -d sk_example_db <<EOF
CREATE TABLE sk_example_table (id SERIAL, obj JSONB NOT NULL, PRIMARY KEY(id));
INSERT INTO sk_example_table (obj) VALUES ('{"current":0}'::JSONB);
EOF

## Установка приложения

bash

Клонирование репозитория
git clone [url-репозитория]
Установка зависимостей
npm install
Настройка переменных окружения
cp .env.example .env
Отредактируйте .env файл, установив необходимые значения

## Конфигурация
Создайте файл .env в корневой директории проекта со следующими параметрами:

env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=sk_example_db
DB_PASSWORD=ваш_пароль
DB_PORT=5432
PORT=3000

## Запуск приложения

bash

npm start
или
node server.js

## API Endpoints

### POST /modify
Увеличивает значение поля current в записи с указанным id.

#### Запрос
json
{
"id": <number>,
"add": <number>
}

#### Успешный ответ

json
{
"current": <number>
}

#### Ошибка
- Статус: 418
- Возвращается, если запись не найдена или произошла ошибка при обработке

## Примеры использования

bash
curl -X POST http://localhost:3000/modify \
-H "Content-Type: application/json" \
-d '{"id": 1, "add": 5}'

bash
curl -X POST http://localhost:3000/modify \
-H "Content-Type: application/json" \
-d '{"id": 1, "add": 5}'
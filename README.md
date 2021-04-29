# test-show-kadastr
Отображение на карте полигона объекта, полученного по кадастровому номеру.
Стек: фронт-React, бек-Aiohttp.

## Сборка фронтенда
```
cd ./front
yarn install
yarn build
```
## переходим в корневой католг
cd ../
## Создание виртуального окружения
`python -m venv ./.env`
## Активация виртуального окружения (Linux and MacOS)
`. ./.env/bin/activate`
## Установка зависимостей
`pip install -r requirements.txt`

## Запуск приложения
`python ./main.py`


## Запуск тестов
pytest ./tests.py
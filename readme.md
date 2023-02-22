# Моя реализация задачи: 
https://github.com/DimaSxz/test-node-creative

Отклонился от требований: 
1. Сменил сервис обмена валюты, так как старый убрал бесплатный тариф. 
2. Не сделал каждодневное обновление данных по каждой валюте в буфер. 
3. От себя убрал ограничение на обмен 4 валют. Обменять можно почти все существующие валюты. 


# Использование: 
## Узнать курс рубля к доллару: 
### POST request /getCurrency
### body: {
    "from": "RUB",
    "to": "USD"
}

## Узнать курс рубля к доллару за 2012.07.09:
### POST request /getCurrencyByDate
### body: {
    "from": "USD",
    "to": "RUB",
	"date": "2012-07-09"
}

Для доступа к API, ко всем запросам также нужно передавать api_key в headers. Все переменные (данные о БД, api_key) нужно зашить в файл .env. Пример: 

>THIRD_APP_API_KEY=f93fb54d4218b6ba25561f75730c4252c314415
>API_KEY=321
>PORT=4000
>USER=alekseimiliutin
>HOST=localhost
>DATABASE=postgres
>PASSWORD=1234567890
>DB_PORT=5432
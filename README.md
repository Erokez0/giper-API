## Эндпоинты

# Продукты
GET /api/product/all - Все продукты
Query
    page - Номер страницы
    pageSize - Число элементов на странице
    sortBy - Относительно чего сортировать
    sortDirection - Порядок сортировки

GET /api/product/:id - Продукт по ID

GET /api/product/find - Поиск продуктов
Query
    page - Номер страницы
    pageSize - Число элементов на странице
    sortBy - Относительно чего сортировать
    sortDirection - Порядок сортировки
    lessThan - Цена меньше чем
    moreThan - Цена больше чем
    tag - Тэг
    description - описание
    name - название

POST /api/product - Создать продукт
Body
```json
{
  "name": "Мультиварка",
  "description": "made in china",
  "price": 1000,
  "sale_price": 100,
  "image": "Фото",
  "status": [
    "Bestseller"
    ]
}
```
PATCH /api/product/:id - Обновить продукт по ID
Body
```json
{
  "name": "Обновленная Мультиварка",
  "description": "Tefal",
  "price": 110,
  "sale_price": 100,
  "image": "Фото",
  "status": [
    "Bestseller"
    ]
}
```
DELETE /api/product/:id - Удалить продукт по ID

# Остатки
POST /api/stock - Создать остаток
Body
```json
{
  "productid": 1,
  "quantity": 234
}
```
PATCH /api/stock/:id - Обновить остаток по ID
Body
```json
{
  "quantity": 1987
}
```
DELETE /api/stock/:id - Удалить остаток оп ID

GET /api/stock/:id - Получить остаток по ID

# Пользователи
POST /api/user/signup - Создать нового пользователя
Body
```json
{
  "login": "admin",
  "password": "admin"
}
```
POST /api/user/login - Войти в аккаунт
Body
```json
{
  "login": "Пассатижи",
  "password": "1983"
}
```
GET /api/user/all - Получить всех пользователей (Без паролей и токенов)

GET /api/me - Получить себя как пользователя

DELETE /api/user/:id - Удалить пользователя по ID

PATCH /api/user/:id - Обновить пользователя по ID
Body
```json
{
  "login": "Пассатижи2",
  "password": "1999"
}
```
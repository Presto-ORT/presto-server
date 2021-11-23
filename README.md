# Presto

Presto es una aplicación para gestionar el presupuesto personal y del hogar. Permite registrar gastos de manera diaria. Cada uno está compuesto por una categoría, una subcategoría y un importe. En el area de reportes se puede visualizar el gasto acumulado mensual a través de un gráfico de torta ordenado según las categorías.

<p align="center">
<img src="https://i.postimg.cc/qMcjQY3w/presto1.jpg">
<img src="https://i.postimg.cc/cLXTGnT8/presto2.jpg">
<img src="https://i.postimg.cc/QdXSzbg3/presto3.jpg">
</p>

## Listados de endpoints

### Manejo de usuarios
| Method | Endpoint            | Authorization |             Body              | Params | Query |               Response                |
| :----: | ------------------- | :-----------: | :---------------------------: | :----: | :---: | :-----------------------------------: |
|  POST  | /users/register     |       ❌       | ```{name, email, password}``` |   ❌    |   ❌   | ```{_id, name, email, accessToken}``` |
|  POST  | /users/login        |       ❌       |    ```{email, password}```    |   ❌    |   ❌   | ```{_id, name, email, accessToken}``` |
|  POST  | /users/login/google |       ❌       |      ```{accessToken}```      |   ❌    |   ❌   | ```{_id, name, email, accessToken}``` |

### Manejo de registros
```js
record: {
    _id: ObjectId,
    category: String,
    subcategory: String,
    description: String,
    amount: double,
    date: Date,
    user: ObjectId,
    dollar: boolean
}
```
| Method | Endpoint     | Authorization  |    Body    |  Params   |                    Query                     |    Response     |
| :----: | ------------ | :------------: | :--------: | :-------: | :------------------------------------------: | :-------------: |
|  GET   | /records     | Bearer [token] |     ❌      |     ❌     | `?day=[number]&month=[number]&year=[number]` | `[record, ...]` |
|  GET   | /records/:id | Bearer [token] |     ❌      | `user id` |                      ❌                       |    `record`     |
|  POST  | /records     | Bearer [token] | `{record}` |     ❌     |                      ❌                       |   `Some text`   |
|  PUT   | /records/:id | Bearer [token] | `{record}` | `user id` |                      ❌                       |      `{ }`      |
| DELETE | /records/:id | Bearer [token] |     ❌      | `user id` |                      ❌                       |      `{ }`      |

### Manejo de categorias
```js
category: {
    _id: ObjectId,
    title: String,
    subcategory: Array,
    icon: String,
    color: String,
}

subcategory: {
    title: String,
    icon: String,
    description: String
}
```
| Method | Endpoint        | Authorization | Body  |    Params     | Query |     Response      |
| :----: | --------------- | :-----------: | :---: | :-----------: | :---: | :---------------: |
|  GET   | /categories     |       ❌       |   ❌   |       ❌       |   ❌   | `[category, ...]` |
|  GET   | /categories/:id |       ❌       |   ❌   | `category id` |   ❌   |    `category`     |

### Manejo de reportes
```js
report: {
    category: String,
    total: double
}
```
| Method | Endpoint | Authorization  | Body  | Params | Query |    Response     |
| :----: | -------- | :------------: | :---: | :----: | :---: | :-------------: |
|  GET   | /reports | Bearer [token] |   ❌   |   ❌    |   ❌   | `[report, ...]` |

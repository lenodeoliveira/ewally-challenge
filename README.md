# Ewally Challenge :rocket:

### NodeJS Developer Test Resolution for Ewally

The proposed test aims to obtain a typeable line (agreement or security) through endpoint /boleto and verify that the typeable line is valid and return the values ​​of the bar code, invoice amount and due date.

## Routes for titles:
#### `/boleto`
| Method   |     endpoint      | status code
|----------|:-----------------:|-----------:
| GET      | /boleto/:code     | 200

> example: `http://localhost:8080/boleto/817700000000010936599702411310797039001433708318`

#### Response

```
{
  "barCode": "21299758700000020000001121100012100447561740",
  "amount": 20,
  "expirationDate": "2018-07-16"
}
```
<hr/>

## Routes for agreements:
#### `/boleto`
| Method   |     endpoint      | status code
|----------|:-----------------:|-----------:
| GET      | /boleto/:code     | 200


> example: `http://localhost:8080/boleto/21290001192110001210904475617405975870000002000`

#### Response

```
{
 "barCode": "81770000000010936599704113107970300143370831",
 "amount": 1.09
}
```
<hr/>

### Install the dependencies, run the build, run the tests and run the project 

* `npm run build`
* `npm test`
* `npm start`

> :warning: **The project can also be run by Docker using below commands: 🐳 **

* `npm run up`
* `npm run down`
[![CircleCI](https://circleci.com/gh/lenodeoliveira/ewally-challenge/tree/main.svg?style=svg)](https://circleci.com/gh/lenodeoliveira/ewally-challenge/tree/main)  [![Coverage Status](https://coveralls.io/repos/github/lenodeoliveira/ewally-challenge/badge.svg?branch=main&kill_cache=1)](https://coveralls.io/github/lenodeoliveira/ewally-challenge?branch=main) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# Ewally Challenge :rocket:

### NodeJS Developer Test Resolution for Ewally

The proposed test aims to obtain a typeable line (agreement or security) through endpoint `/boleto` and verify that the typeable line is valid and return the values โโof the bar code, invoice amount and due date.

## Routes to titles:
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

## Routes to agreements:
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

> :warning: **The project can also be run by Docker using below commands**: ๐ณ

* `npm run up`
* `npm run down`

### Libraries and tools used: โ๏ธ
* NodeJS
* Express
* Docker
* Circleci
* Coveralls
* Jest
* Eslint
* Lint Staged
* Git
* NPM
* Husky js
* Rimraf
* Typescript
* Supertest
* Standard Javascript Style



<hr/>

๐

I would be happy to receive any feedback.

<a href="https://www.linkedin.com/in/johnlennondeoliveira/" target="blank"><img align="center" src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/linkedin.svg" alt="https://www.linkedin.com/in/johnlennondeoliveira/" height="50" width="50" /></a>
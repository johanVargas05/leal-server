<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo
1. Clonar el repositorio
2. ejecutar
```CONSOLE
yarn install
```
3. Tener NEST JS CLI instalado en dado caso de no tenerlo ejecutar el siguiente comando: 
```CONSOLE
npm i -g @nestjs/cli
``` 
4. Levantar la base de datos 
```CONSOLE
docker-compose up -d
```
5. Clonar el archivo __.env.template__  y renombrar la copia como __.env__
6. Llenar las variables de entorno definidas en el __.env__
7. Ejecutar la aplicación en modo desarrollo
```CONSOLE
yarn start:dev
``` 
8.Reconstruir datos de prueba de la base de datos
```http

http://localhost:3000/api/v1/seed

```
# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de prod
3. Crear la nueva imagen
```CONSOLE
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```
4. Cuando la imagen ya este creada solo basta ejecutar el siguiente comando para correr el servidor
```CONSOLE
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up -d
```
## Stack usado
* MongoDB
* Nest js

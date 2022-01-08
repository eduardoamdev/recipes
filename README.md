# Recipes Network Api

## Descripción

Esta API REST proporciona una serie de end points que suministran información a la red social Recipes Network a la cual se puede acceder en https://amdev-recipes-network.herokuapp.com/
El dominio en el que se encuentra alojada la API es https://recipes-network-api.herokuapp.com/

## Tecnologías empleadas

### Express

Express es un paquete de software de NodeJS que nos permite levantar un servidor de manera sencilla.

### Mongoose

Mongoose nos permite interactuar con una base datos MongoDB por medio de los modelos.

### Dotenv

Dotenv nos va a permitir crear un documento con variables de entorno que serán accesibles desde cualquier documento de la API.

### Bcrypt

Este módulo sirve para convertir la contraseña en claro que nos llega del cliente en un hash que podamos guardar en nuestra base de datos.

### JSON Web Token

Con JSON Web Token o JWT crearemos un token de autenticación que enviaremos al usuario después de que este se loguee de manera correcta. Este token quedará almacenado en el navegador y durante la utilización de las funcionalidades de la aplicación nuestro front-end irá haciendo llamadas a la API en las que tendrá que suministrar el token para recibir las respuestas deseadas.

### CORS

El módulo CORS (cross-origin resource sharing) nos permite gestionar qué clientes van a tener acceso la API.

### ¿Qué me ha aportado el desarrollo de esta API?

Esta aplicación es el back-end más complejo que he desarrollado hasta la fecha.
La gestión de la contraseñas, autenticacines y sesiones se hace secilla gracias a Bcrypt y JSON Web Token y la comunicación con la base de datos por medio de modelos no supone un problema ya que Mongoose nos facilita enormemente la tarea.
La complejidad ha residido sobre todo en trabajar con las inteacciones entre usuarios, sobre todo a la hora de seguir a otros y de agregar recetas a los favoritos. Para implementar estas funcionalidades ha sido necesario crear los modelos de manera coherente y tenerl en cuenta en diversas rutas los estados de ciertos usuarios con respecto a otros.
Este proyecto también me ha servido para refrescar alguna nociones de testing mediante la utilización de los paquetes Mocha y Chai.
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

## Puesta en marcha

Para arrancar esta API de manera local es necesario seguir los siguientes pasos:

### Descargar el repositorio

Hay que clonar el repositorio empleando el comando "git clone" seguido de la url del proyecto.

### Instalar paquetes de software

Acceder a la raíz del proyecto con nuestra terminal y, una vez dentro ejecutar el comando "npm i". De esta manera, instalaremos todos los paquetes de software que figuran en el document package.json de manera local (exclusivamente dentro del directorio del proyecto).

### Base de datos

Es necesario disponer de una base de datos MongoDB para que nuestro servidor de Express se comunique con ella. En este proyecto la url de la base de datos está preparada para trabajar en remoto pero se puede cambiar para trabajar en local.

### Configurar las variables de entorno

Crearemos un archivo .env en el directorio raíz de nuestro proyecto. Este archivo albergará las variables de entorno que son las siguientes:

#### PORT

El puerto de nuestro ordenador en el que queremos que se aloje nuestro back-end.

#### CLUSTER_NAME

El nombre del cluster.

#### DB_NAME

El nombre de la base de datos.

#### DB_PASSWORD

La contraseña de nuestra base de datos.

#### DB_USER

El nombre del usuario de la base de datos.

#### SECRET_WORD

La palabra secreta que emplearemos en JSON Web Token.

### Arrancar el proyecto

El siguiente paso será ejecutar el comando "npm run dev" desde el directorio raíz del proyecto.

### Hacer peticiones

Una vez realizado el proceso de puesta en marcha ya podemos realizar peticiones a la API.
Podemos emplear un cliente web como puede Postman o Insomnia o también tenemos la opción de descargar el front-end de este proyecto y ejecutarlo para que hacer las peticiones mientras ejecutamos la aplicación.
El front-end se puede descargar en el siguiente enlace: https://github.com/eduardoamdev/recipes-network

## ¿Qué me ha aportado el desarrollo de esta API?

Esta aplicación es el back-end más complejo que he desarrollado hasta la fecha.
La gestión de la contraseñas, autenticacines y sesiones se hace secilla gracias a Bcrypt y JSON Web Token y la comunicación con la base de datos por medio de modelos no supone un problema ya que Mongoose nos facilita enormemente la tarea.
La complejidad ha residido sobre todo en trabajar con las inteacciones entre usuarios, sobre todo a la hora de seguir a otros y de agregar recetas a los favoritos. Para implementar estas funcionalidades ha sido necesario crear los modelos de manera coherente y tenerl en cuenta en diversas rutas los estados de ciertos usuarios con respecto a otros.
Este proyecto también me ha servido para refrescar alguna nociones de testing mediante la utilización de los paquetes Mocha y Chai.
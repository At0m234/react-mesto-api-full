# __Mesto Russia (backend)__ 

## __[Application Frontend here](https://github.com/At0m234/react-mesto-app/tree/main/frontend)__

## __[GitHub Pages (Frontend)](https://at0m234.github.io/react-mesto-app/)__
## __Functionality__
Mesto Russia (backend) - backand of adaptive single page application. 
Server allows you:
 - register (hash password);
 - login;
 - return users info and cards;
 - add and remove your own cards.

## __Available Scripts__

### __`npm run start`__ 
starts the server on PORT = 4000;
### __`npm run dev`__ 
starts the server in development mode with hot-reload on PORT = 4000;

## __Requests__

### `POST http://localhost:4000/signup`
Registration;

### `POST http://localhost:4000/signin`
Login;

### `GET http://localhost:4000/`
Returns all users and cards;

### `GET http://localhost:4000/me`
Returns user`s name, profession and avatar; 

### `POST http://localhost:4000/`
Creates user`s card; 

### `DELETE http://localhost:4000/:cardId`
Removes user`s card; 

## __Directories__

### `/controllers` 
folder with units and cards request controllers; 
### `/errors` 
folder with request error classes;
### `/middlewares` 
folder with middleware authorization and logging requests; 
### `/models` 
folder with schemas of the user and the card; 
### `/routes` 
folder with request routes.

## __Stack__

### `Node.js`

### `Express`

### `Mongoose`

### `MongoDB`

### `Celebrate`
### `Logger`

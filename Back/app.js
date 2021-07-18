//Imports
const express = require("express");
const expressJwt = require('express-jwt');
const crud = require('./crud');
const verify = require('./middlewares');

//Express instance
const app = express();
const jwtKey = "password";

//Global middlewares
app.use(express.json()); 
app.use(expressJwt({ 
	secret :jwtKey, 
	algorithms: ['HS256'] 
	})
	.unless({ path: '/user/login' }) ); 
app.use( verify.token ); 

//Constants
const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//Endpoints 
app.get( '/users', crud.user.getAllUsers );
app.post( '/user/login', crud.user.loginUser );
app.post( '/user/register', verify.admin, crud.user.createUser );
app.put( '/user/:id', crud.user.updateUser );
app.delete( '/user/:id', crud.user.deleteUser );

// app.get( '/user/:id', verify.admin, crud.user.getUser );
// app.get( '/users', verify.admin, crud.user.getAllUsers );

//Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
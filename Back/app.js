//Imports
const express = require("express");
const expressJwt = require('express-jwt');
const crud = require('./crud');
const verify = require('./middlewares');
const cors = require('cors');

//Express instance
const app = express();
const jwtKey = "password";

//Global middlewares
app.use(express.json()); 
app.use(cors());
app.use(expressJwt({ 
	secret :jwtKey, 
	algorithms: ['HS256'] 
	})
	.unless({ path: '/user/login' }) ); 
app.use( verify.token ); 

//Constants
const PORT = process.env.APP_PORT ? process.env.APP_PORT : 3000;

//User endpoints 
app.get( '/users', crud.user.getAllUsers );
app.post( '/user/login', crud.user.loginUser );
app.post( '/user/register', verify.admin, crud.user.createUser );
app.put( '/user/:id', crud.user.updateUser );
app.delete( '/user/:id', crud.user.deleteUser );
app.get( '/user/:id', verify.admin, crud.user.getUser );
// app.get( '/users', verify.admin, crud.user.getAllUsers );

//City endpoints
app.get ( '/city/:id' , crud.city.getCity );
app.get ( '/cities' , crud.city.getCities );
app.post ( '/city' , crud.city.createCity );
app.put ( '/city/:id' , crud.city.updateCity );
app.delete ( '/city/:id' , crud.city.deleteCity)

//Country endpoints
app.get ( '/country/:id' , crud.country.getCountry );
app.get ( '/countries' , crud.country.getCountries );
app.post ( '/country' , crud.country.createCountry );
app.put ( '/country/:id' , crud.country.updateCountry );
app.delete ( '/country/:id' , crud.country.deleteCountry );

//Region endpoints
app.get ( '/region/:id' , crud.region.getRegion );
app.get ( '/regions' , crud.region.getRegions );
app.post ( '/region' , crud.region.createRegion );
app.put ( '/region/:id' , crud.region.updateRegion );
app.delete ( '/region/:id' , crud.region.deleteRegion );

//Company endpoints
app.get ( '/company/:id' , crud.company.getCompany );
app.get ( '/companies' , crud.company.getCompanies );
app.post ( '/company' , crud.company.createCompany );
app.put ( '/company/:id' , crud.company.updateCompany );
app.delete ( '/company/:id' , crud.company.deleteCompany );

//Contact endpoints
app.post ( '/contact' , crud.contact.createContact );
app.put ( '/contact/:id' , crud.contact.updateContact );
app.delete ( '/contact/:id' , crud.contact.deleteContact );
app.get ( '/contact/:id' , crud.contact.getContact );
app.get ( '/contacts' , crud.contact.getAllContacts );
app.get ( '/search/:word' , crud.contact.searchContacts );

//Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
const mysql = require('mysql2/promise');
const Sequelize = require('sequelize');
const { company } = require('./tables');
const tables = require('./tables');

const data = { 
    host : "localhost", 
    port : "3306", 
    user : "root",
    password : "root"};

const db = "dw_cmnl";

async function init() {

    const path = `mysql://${data.user}:${data.password}@${data.host}:${data.port}/${db}`;

    const connection = await mysql.createConnection(data);
    console.log('Conected to MySQL server');
    await connection.query(`DROP DATABASE IF EXISTS ${db};`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${db};`);
    console.log(`Database created (${db})`);

    const sequelize = new Sequelize( path , { logging : false } );
    sequelize.authenticate()
        .then( console.log( `Conected to database (${db})`) )
        .catch( err => console.error('Error de conexion:', err) );

    await sequelize.query(tables.user.createTable);
    await sequelize.query(tables.region.createTable);
    await sequelize.query(tables.country.createTable);
    await sequelize.query(tables.city.createTable);
    await sequelize.query(tables.company.createTable);

    console.log('Tables created');

    await sequelize.query(tables.user.setValues);
    await sequelize.query(tables.region.setValues);
    await sequelize.query(tables.country.setValues);
    await sequelize.query(tables.city.setValues);
    await sequelize.query(tables.company.setValues);

    console.log('Records created');

    return sequelize
}

module.exports = init;





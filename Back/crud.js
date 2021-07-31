const md5 = require('md5');
const moment = require('moment');
const token = require('./token');
const init = require('./conection');

let sequelize; 
init().then( s => sequelize = s);

const existingID = async ( id, table ) => {

    table = table.replace(/['"]+/g, '');
    const data = await sequelize.query( `SELECT id FROM ${table} WHERE id = ${id}`, {type: sequelize.QueryTypes.SELECT});  
    if (data.length == 0) return false
    else return true
}

const user = {
    createUser : (req, res) => {
        const { username, fullname, email } = req.body;
        let { password, role } = req.body;
        if (!role) role = "user";
        password = md5(password);

        sequelize.query(
        `INSERT INTO user ( username, fullname, email, password, role ) 
        VALUES ( :_username, :_fullname, :_email, :_password, :_role )`,{
            replacements: {
                _username : username, 
                _fullname : fullname, 
                _email : email, 
                _password : password, 
                _role : role
                },
              }
        )
        .then((data) => res.status(201).send("User created successfully !"))
        .catch((err) => {
            const error = err.original.errno = 1062 ? `The username "${username}" is already in use.` : err;
            res.status(400).send("Error: " + error)          
        });
    },
    loginUser : ( req, res ) => {
        const { username } = req.body;
        let { password } = req.body;
        password = md5(password);
        sequelize.query(
            `SELECT * FROM user
            WHERE username = :_username`
            , {
                type: sequelize.QueryTypes.SELECT,
                replacements : {
                    _username : username,
                }
            }
        )
        .then( data => {
            const queryRes = data[0];
            
            if ( queryRes == undefined ) {
                 return res.status(401).send("The user is not registered");
            }   
            
            if ( queryRes.password == password ) {
                const { id, username, role } = queryRes;
                const authToken = token.encode ( id, username, role );
                res.status(200).send( authToken);
            }
            else {
                res.status(401).send("User or password is invalid");
            }
        })
        .catch( err => res.status(404).send("Error: " + err));
    },
    // getLoggedUser : async (req, res) => {

    //     const { id }  = token.decode(req.headers);
    //     const loggedUser = await sequelize.query("SELECT username, fullname, email, telephone, address FROM user WHERE id = :_id", { 
    //         type: sequelize.QueryTypes.SELECT ,
    //         replacements : {
    //             _id : id
    //         }
    //     });
    //     res.status(200).json(loggedUser[0])
    // },
    // getUser : async (req, res) => {

    //     const id = req.params.id;
    //     const userInfo = await sequelize.query("SELECT username, fullname, email, telephone, address FROM user WHERE id = :_id", { 
    //         type: sequelize.QueryTypes.SELECT ,
    //         replacements : {
    //             _id : id
    //         }
    //     });

    //     if (userInfo.length === 0) res.status(404).send('The user id does not exist');
    //     else res.status(200).json(userInfo[0]);
    // },
    getAllUsers : async (req, res) => {

        const users = await sequelize.query("SELECT username, fullname, email, role, active FROM user", { 
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(users);
    },
    updateUser : async ( req , res ) => {

        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.user" );
        if ( !verifyID ) res.status(404).send('The ID does not exist');

        const { username, fullname, email } = req.body;
        let { role, active } = req.body;
        
        let queryString = `username = "${username}" , fullname = "${fullname}" , email = "${email}"`;

        if ( role == "admin" || role == "user" ) queryString += `, role = "${role}"`;
        if ( active == "Y" || active == "N") queryString += `, active = "${active}"`;

        sequelize.query( `UPDATE user SET ${queryString} WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(201).send('The user has been updated');
            })
            .catch( err => res.status(400).send("Error: " + err));
    },
    deleteUser : async ( req , res ) => {

        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.user" );
        if ( !verifyID ) res.status(404).send('The ID does not exist');

        sequelize.query( `UPDATE user SET active = "N" WHERE id = ${id}`)
            .then( data => res.status(404).send('User is inactive now'))
            .catch( err => res.status(400).send("Error: " + err));
    }
};

const city = {
    getCity : async ( req, res) => {
        
        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.city");
        if ( !verifyID ) res.status(404).send('The city ID does not exist');

        const city = await sequelize.query( `SELECT * FROM city WHERE id = ${id}`, {
                type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(city[0]);
    },
    getCities : async ( req, res) => {
        
        const cities = await sequelize.query("SELECT * FROM city", { 
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(cities);
    },
    createCity : (req, res) => {

        const { country_id , name } = req.body;
        
        sequelize.query(
        `INSERT INTO city ( country_id, name ) 
        VALUES ( ${country_id}, "${name}" )`
        )
        .then((data) => res.status(201).send("City created successfully !"))
        .catch((err) => {
            const error = err.original.errno == 1062 ? `The city "${name}" already exists.` : `The country id does not exist`;
            res.status(400).send("Error: " + error)          
        });
    },
    updateCity : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.city" );
        if ( !verifyID ) res.status(404).send('The city ID does not exist');

        const { country_id , name } = req.body;
        
        let queryString = `country_id = ${country_id} , name = "${name}"`;

        sequelize.query( `UPDATE city SET ${queryString} WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(201).send('The city has been updated');
            })
            .catch( err => res.status(400).send("Error: " + err));
    },
    deleteCity : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.city" );
        if ( !verifyID ) res.status(404).send('The ID does not exist'); 

        sequelize.query ( `DELETE FROM city WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(200).send('The city has been deleted');
            })
            .catch( err => res.status(405).send(err.original))
    }
};

const country = {
    getCountry : async ( req, res) => {
        
        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.country");
        if ( !verifyID ) res.status(404).send('The country ID does not exist');

        const country = await sequelize.query( `SELECT * FROM country WHERE id = ${id}`, {
                type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(country[0]);
    },
    getCountries : async ( req, res) => {
        
        const countries = await sequelize.query("SELECT * FROM country", { 
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(countries);
    },
    createCountry : (req, res) => {

        const { region_id , name } = req.body;
        
        sequelize.query(
        `INSERT INTO country ( region_id, name ) 
        VALUES ( ${region_id}, "${name}" )`
        )
        .then((data) => res.status(201).send("Country created successfully !"))
        .catch((err) => {
            const error = err.original.errno == 1062 ? `The country "${name}" already exists.` : `The region id does not exist`;
            res.status(400).send("Error: " + error)          
        });
    },
    updateCountry : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.country" );
        if ( !verifyID ) res.status(404).send('The country ID does not exist');

        const { region_id , name } = req.body;
        
        let queryString = `region_id = ${region_id} , name = "${name}"`;

        sequelize.query( `UPDATE country SET ${queryString} WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(201).send('The country has been updated');
            })
            .catch( err => res.status(400).send("Error: " + err));
    },
    deleteCountry : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.country" );
        if ( !verifyID ) res.status(404).send('The ID does not exist'); 

        sequelize.query ( `DELETE FROM country WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(200).send('The country has been deleted');
            })
            .catch( err => res.status(405).send(err.original))
    }
};

const region = {
    getRegion : async ( req, res) => {
        
        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.region");
        if ( !verifyID ) res.status(404).send('The region ID does not exist');

        const region = await sequelize.query( `SELECT * FROM region WHERE id = ${id}`, {
                type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(region[0]);
    },
    getRegions : async ( req, res) => {
        
        const regions = await sequelize.query("SELECT * FROM region", { 
            type: sequelize.QueryTypes.SELECT
        });
        res.status(200).json(regions);
    },
    createRegion : (req, res) => {

        const { name } = req.body;
        
        sequelize.query(
        `INSERT INTO region ( name ) 
        VALUES ( "${name}" )`
        )
        .then((data) => res.status(201).send("Region created successfully !"))
        .catch((err) => {
            let error = null;
            if ( err.original.errno == 1062 ) error = `The region "${name}" already exists.`;
            res.status(400).send("Error: " + error)          
        });
    },
    updateRegion : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.region" );
        if ( !verifyID ) res.status(404).send('The region ID does not exist');

        const { name } = req.body;
        
        let queryString = `name = "${name}"`;

        sequelize.query( `UPDATE region SET ${queryString} WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(201).send('The region has been updated');
            })
            .catch( err => res.status(400).send("Error: " + err));
    },
    deleteRegion : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.region" );
        if ( !verifyID ) res.status(404).send('The ID does not exist'); 

        sequelize.query ( `DELETE FROM region WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(200).send('The region has been deleted');
            })
            .catch( err => res.status(405).send(err.original))
    }
};

const crud = { user , city , country , region } 

module.exports = crud;


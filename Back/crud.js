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

        const users = await sequelize.query("SELECT username, fullname, email, role, active FROM user WHERE active = 'Y'", { 
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

const company = {
    getCompany : async ( req, res) => {
 
        const id = req.params.id;
        const verifyID = await existingID( id, "dw_cmnl.company");
        if ( !verifyID ) res.status(404).send('The company ID does not exist');

        const company = await sequelize.query( `
        SELECT company.id, company.name, company.address, company.email, company.telephone, country.name as country, city.name as city
            FROM company, country, city 
            WHERE company.city_id = city.id 
            AND city.country_id = country.id
            AND company.id = ${id}
        `, 
        { type: sequelize.QueryTypes.SELECT });

        res.status(200).json(company[0]);
    },
    getCompanies : async ( req, res) => {

        const companies = await sequelize.query( `
        SELECT company.id, company.name, company.address, company.email, company.telephone, country.name as country, city.name as city
            FROM company, country, city 
            WHERE company.city_id = city.id 
            AND city.country_id = country.id
        `, 
        { type: sequelize.QueryTypes.SELECT });

        res.status(200).json(companies);
    },
    createCompany : (req, res) => {

        const { name, address, email, telephone, city_id } = req.body;
        
        sequelize.query(
        `INSERT INTO dw_cmnl.company (name, address, email, telephone, city_id) 
        VALUES 
        ('${name}', '${address}', '${email}', '${telephone}', ${city_id})`
        )
        .then((data) => res.status(201).send("Company registered successfully !"))
        .catch((err) => {
            let error = null;
            if ( err.original.errno == 1062 ) error = `The company "${name}" already exists.`;
            res.status(400).send("Error: " + error)          
        });
    },
    updateCompany : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.company" );
        if ( !verifyID ) res.status(404).send('The company ID does not exist');

        const { name, address, email, telephone, city_id } = req.body;
    
        let queryString = `
            name = "${name}",
            address = "${address}",
            email = "${email}",
            telephone = "${telephone}",
            city_id = "${city_id}"
        `;

        sequelize.query( `UPDATE company SET ${queryString} WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(201).send('The company has been updated');
            })
            .catch( err => res.status(400).send("Error: " + err));
    },
    deleteCompany : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.company" );
        if ( !verifyID ) res.status(404).send('The company ID does not exist'); 

        sequelize.query ( `DELETE FROM company WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(200).send('The company has been deleted');
            })
            .catch( err => res.status(405).send(err.original))
    }
}

const contact = {
    createContact : async ( req , res ) => {
        
        const { first_name, last_name, work_position, email, address, interest, company_id, city_id, channels} = req.body;
        
        try {
            await sequelize.query(
                `INSERT INTO dw_cmnl.contact (first_name, last_name, work_position, email, address, interest, company_id, city_id) 
                VALUES (
                    '${first_name}', 
                    '${last_name}', 
                    '${work_position}', 
                    '${email}', 
                    '${address}', 
                    '${interest}', 
                     ${company_id}, 
                     ${city_id})`
                );
        } catch (error) {
            res.status(400).send("Error: " + error);
        }

        const contact_id = await sequelize.query(
            `SELECT id FROM dw_cmnl.contact ORDER BY id DESC LIMIT 1`,
            {type: sequelize.QueryTypes.SELECT}
        );

        channels.map( channel => {
            sequelize.query(`
            INSERT INTO dw_cmnl.channel_detail (contact_id, channel_id, data, preference) 
            VALUES ( 
                ${contact_id[0].id},
                ${channel.channel_id}, 
                '${channel.data}', 
                '${channel.preference}')`
            )
            .then( data => console.log(`Channel ${channel.channel_id} successfully asociated`))
            .catch( err => res.status(400).send("Error: " + err))
        });
        res.status(201).send("Contact successfully registered!")
    },
    updateContact : async ( req , res ) => {

        const contact_id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( contact_id, "dw_cmnl.contact" );
        if ( !verifyID ) res.status(404).send('The contact ID does not exist');

        const { first_name, last_name, work_position, email, address, interest, company_id, city_id, channels} = req.body;
        
        try {
            await sequelize.query(
                `UPDATE dw_cmnl.contact  
                SET first_name = '${first_name}', 
                    last_name = '${last_name}', 
                    work_position = '${work_position}', 
                    email = '${email}', 
                    address = '${address}', 
                    interest = '${interest}', 
                    company_id = ${company_id}, 
                    city_id = ${city_id}
                WHERE id = ${contact_id}`
            );
        } catch (error) {
            res.status(400).send("Error: " + error);
        }
        
        // Get existing channels, to compare with the new ones
        const existingChannels = await sequelize.query(`
            SELECT channel_id, data, preference 
                FROM dw_cmnl.channel_detail
                WHERE contact_id = ${contact_id} ORDER BY channel_id ASC`,
            {type: sequelize.QueryTypes.SELECT}
        );

        const newChannels = channels;
        for (const newChannel of newChannels ) {
            
            const repeatedChannel = existingChannels.find( eChannel => 
                eChannel.channel_id == newChannel.channel_id
            );

            // If newChannel doesn't exist (not repeated), add the new channel for the current contact id 
            if (!repeatedChannel) {  
                
                sequelize.query(`
                INSERT INTO dw_cmnl.channel_detail (contact_id, channel_id, data, preference) 
                VALUES ( 
                    '${contact_id}',
                    '${newChannel.channel_id}', 
                    '${newChannel.data}', 
                    '${newChannel.preference}')`
                )
                .then( data => console.log(`Channel ${newChannel.channel_id} info successfully asociated`))
                .catch( err => res.status(400).send("Error: " + err))
            } else { // newChannel exists, so modify it
                
                sequelize.query(`
                UPDATE dw_cmnl.channel_detail 
                SET data ='${newChannel.data}', 
                    preference = '${newChannel.preference}'
                WHERE contact_id = ${contact_id} AND channel_id = ${newChannel.channel_id}`
                )
                .then( data => console.log(`Channel ${newChannel.channel_id} info successfully modified`))
                .catch( err => res.status(400).send("Error: " + err))
            }      
        }
        res.status(201).send("Contact successfully registered!")
    },
    deleteContact : async ( req , res ) => {

        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.contact" );
        if ( !verifyID ) res.status(404).send('The contact ID does not exist'); 

        sequelize.query ( `DELETE FROM contact WHERE id = ${id}`)
            .then( data => {
                if (data[0].affectedRows === 0) res.status(404).send('No changes were made');
                else res.status(200).send('The contact has been deleted');
            })
            .catch( err => res.status(405).send(err.original))
    }, 
    getContact : async ( req, res ) => {
        
        const id = req.params.id ? req.params.id : null;
        const verifyID = await existingID( id, "dw_cmnl.contact" );
        if ( !verifyID ) res.status(404).send('The contact ID does not exist');

        let contact = {};
        try {
            const contactDetails = await sequelize.query(`
                SELECT contact.first_name, contact.last_name, contact.work_position, contact.email, contact.address, contact.interest, 
                        company.name AS company, 
                        region.name AS region,
                        country.name AS country,
                        city.name AS city
                FROM    dw_cmnl.contact AS contact, 
                        dw_cmnl.company AS company, 
                        dw_cmnl.city AS city,
                        dw_cmnl.country AS country, 
                        dw_cmnl.region AS region
                WHERE contact.city_id = city.id
                AND city.country_id = country.id
                AND country.region_id = region.id 
                AND contact.company_id = company.id
                AND contact.id = ${id}`, 
                { type: sequelize.QueryTypes.SELECT }
            );

            contact = contactDetails[0];

            const contactChannels = await sequelize.query(`
            SELECT 
            channel.name AS channel,
                channel_detail.data,
                channel_detail.preference
            FROM 
                dw_cmnl.channel_detail AS channel_detail,
                dw_cmnl.channel AS channel,
                dw_cmnl.contact AS contact
            WHERE channel_detail.contact_id = contact.id
            AND channel_detail.channel_id = channel.id
            AND contact.id = ${id}`, 
            { type: sequelize.QueryTypes.SELECT }
            );
            contact.channels = contactChannels;
        } catch (error) {
            res.status(400).send(error.original);
        }
        res.status(200).json(contact);
    },
    getAllContacts : async ( req , res ) => {
        
        try {
            const contacts = await sequelize.query(`
                SELECT 
                    contact.first_name, contact.last_name, contact.work_position, contact.interest, 
                    company.name AS company, 
                    region.name AS region,
                    country.name AS country
                FROM    
                    dw_cmnl.contact AS contact, 
                    dw_cmnl.company AS company, 
                    dw_cmnl.city AS city,
                    dw_cmnl.country AS country, 
                    dw_cmnl.region AS region
                WHERE contact.city_id = city.id
                AND city.country_id = country.id
                AND country.region_id = region.id 
                AND contact.company_id = company.id`,
                { type: sequelize.QueryTypes.SELECT }
            );
            res.status(200).send(contacts);

        } catch (error) {
            res.status(400).send(error.original);
        }
    },
    searchContacts : async ( req , res ) => {

        const word = req.params.word;

        try {
            const results = await sequelize.query(`
            SELECT 
                contact.first_name, contact.last_name, contact.work_position, contact.interest, 
                company.name AS company, 
                region.name AS region,
                country.name AS country
            FROM    
                dw_cmnl.contact AS contact, 
                dw_cmnl.company AS company, 
                dw_cmnl.city AS city,
                dw_cmnl.country AS country, 
                dw_cmnl.region AS region
            WHERE ( 
                contact.city_id = city.id
            AND city.country_id = country.id
            AND country.region_id = region.id 
            AND contact.company_id = company.id 
            )
            AND ( 
                contact.first_name LIKE '%${word}%'
            OR contact.last_name LIKE '%${word}%'
            OR contact.work_position LIKE '%${word}%'
            OR contact.interest LIKE '%${word}%'
            OR company.name LIKE '%${word}%'
            OR region.name LIKE '%${word}%'
            OR country.name LIKE '%${word}%'
            )`,
            { type: sequelize.QueryTypes.SELECT }
            );
            res.status(200).json(results);
        } catch (error) {
            res.status(400).send(error.original);
        }
    }
}
    
const crud = { user , city , country , region , company , contact} 

module.exports = crud;
    

const user = {
    createTable : 
    `CREATE TABLE IF NOT EXISTS dw_cmnl.user (
        id INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(45) NOT NULL UNIQUE,
        fullname VARCHAR(45) NOT NULL,
        email VARCHAR(80) NOT NULL,
        password VARCHAR(45) NOT NULL,
        role VARCHAR(10) NOT NULL DEFAULT 'user',
        active VARCHAR(1) NOT NULL DEFAULT 'Y',
        PRIMARY KEY (id)
    )`,
    setValues : 
    `INSERT INTO user ( username, fullname, email, password, role )
	VALUES 
	( "admin", "seed admin", "admin@example.com", "21232f297a57a5a743894a0e4a801fc3", "admin"),
	( "user", "seed user", "user@example.com", "ee11cbb19052e40b07aac0ca060c23ee", "user")`
}

const region = {
    createTable:
    `CREATE TABLE IF NOT EXISTS dw_cmnl.region (
        id INT NOT NULL AUTO_INCREMENT UNIQUE,
        name VARCHAR(45) NOT NULL UNIQUE,
        PRIMARY KEY (id)
    )`,
    setValues:
    `INSERT INTO dw_cmnl.region (name) VALUES 
    ('Sudamérica'),
    ('Norteamérica')`
}

const country = {
    createTable:
    `CREATE TABLE IF NOT EXISTS dw_cmnl.country (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL UNIQUE,
        region_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (region_id)
        REFERENCES dw_cmnl.region (id)
    )`,
    setValues: 
    `INSERT INTO dw_cmnl.country (region_id, name) 
    VALUES 
    (1, 'Argentina'),
    (1, 'Colombia'),
    (1, 'Chile'),
    (1, 'Uruguay'),
    (2, 'México'),
    (2, 'Estados Unidos')`
}

const city = {
    createTable:
    `CREATE TABLE IF NOT EXISTS dw_cmnl.city (
        id INT NOT NULL AUTO_INCREMENT,
        country_id INT NOT NULL,
        name VARCHAR(45) NOT NULL UNIQUE,
        PRIMARY KEY (id),
        FOREIGN KEY (country_id)
        REFERENCES dw_cmnl.country (id)
    )`,
    setValues:
    `
    INSERT INTO dw_cmnl.city (country_id, name) VALUES 
    ('1', 'Buenos Aires'),
    ('1', 'Córdoba'),
    ('2', 'Bogotá'),
    ('2', 'Cúcuta'),
    ('2', 'Medellín'),
    ('3', 'Atacama'),
    ('3', 'Santiago'),
    ('3', 'Valparaíso'),
    ('4', 'Canelones'),
    ('4', 'Maldonado'),
    ('4', 'Montevideo'),
    ('5', 'Ciudad de México'),
    ('5', 'Tijuana'),
    ('6', 'Florida'),
    ('6', 'Texas')`
}
const tables = { user , region , country , city}
module.exports = tables




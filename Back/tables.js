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

const company = {
    createTable:
    `CREATE TABLE IF NOT EXISTS dw_cmnl.company (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL UNIQUE,
        address VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        telephone VARCHAR(45) NOT NULL,
        city_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (city_id)
        REFERENCES dw_cmnl.city (id)
    )`,
    setValues: 
    `INSERT INTO dw_cmnl.company (name, address, email, telephone, city_id) 
    VALUES 
    ('Softtek', 'Softtek avenue 1220', 'softtek@company.com', '4206700', 12),
    ('Globant', 'Globant avenue 2002', 'globant@company.com', '4206701', 1),
    ('Rappi', 'Rappi avenue 1371', 'rappi@company.com', '4206702', 3),
    ('Mercado Libre', 'Mercado libre avenue 1411', 'mercadolib@company.com', '4206703', 1)
    `
}

const contact = {
    createTable:
    `CREATE TABLE IF NOT EXISTS dw_cmnl.contact (
        id INT NOT NULL AUTO_INCREMENT UNIQUE,
        first_name VARCHAR(45) NOT NULL,
        last_name VARCHAR(45) NOT NULL,
        work_position VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        address VARCHAR(45) NOT NULL,
        interest INT NOT NULL,
        company_id INT NOT NULL,
        city_id INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (company_id)
        REFERENCES dw_cmnl.company (id),
        FOREIGN KEY (city_id)
        REFERENCES dw_cmnl.city (id)
    )`,
    setValues: 
    `INSERT INTO dw_cmnl.contact (first_name, last_name, work_position, email, address, interest, company_id, city_id) 
    VALUES 
    ('cristian', 'navarro', 'web developer', 'crist@example.com', 'cris avenue 123', 75, 2, 3),
    ('andres', 'gomez', 'ui/ux designer', 'andres@example.com', 'andres avenue 123', 50, 4, 11),
    ('paula', 'sanchez', 'human resources', 'paula@example.com', 'paula avenue 123', 100, 1, 13),
    ('camila', 'ramirez', 'security engineer', 'camila@example.com', 'camila avenue 123', 25, 3, 7)`
}

const channel = {
    createTable :
    `CREATE TABLE IF NOT EXISTS dw_cmnl.channel (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(45) NOT NULL UNIQUE,
        PRIMARY KEY (id)
    )`,
    setValues:
    `INSERT INTO dw_cmnl.channel (name) 
    VALUES 
    ('telephone'),
    ('email'),
    ('whatsapp'),
    ('instagram'),
    ('twitter'),
    ('facebook'),
    ('linkedin')`
}

const channelDetail = {
    createTable : `
    CREATE TABLE IF NOT EXISTS dw_cmnl.channel_detail (
        id INT NOT NULL AUTO_INCREMENT UNIQUE,
        contact_id INT NOT NULL,
        channel_id INT NOT NULL,
        data VARCHAR(45) NOT NULL,
        preference VARCHAR(45) NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (contact_id)
        REFERENCES dw_cmnl.contact (id),
        FOREIGN KEY (channel_id)
        REFERENCES dw_cmnl.channel (id)      
    )`,
    setValues : 
    `
    INSERT INTO dw_cmnl.channel_detail (contact_id, channel_id, data, preference) 
    VALUES 
    (1, 1, '4405060', 'Sin preferencia'),
    (1, 4, 'cristian_instagram', 'Canal favorito'),
    (2, 5, 'andres_twitter', 'Canal favorito'),
    (3, 6, 'paula_facebook', 'No molestar'),
    (3, 7, 'paula_linkedin', 'Sin preferencia'),
    (3, 3, '4405061', 'Sin preferencia'),
    (4, 2, 'camila@example.com', 'Canal favorito')`
}


const tables = { user , region , country , city , company , contact , channel , channelDetail }
module.exports = tables




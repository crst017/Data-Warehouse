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

const tables = { user }
module.exports = tables

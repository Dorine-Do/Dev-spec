
const checkDB = async (connection) => {
    const [databases] = await connection.query('SHOW DATABASES');
    if (!databases.some(database => database.Database === 'SnackKing')) {
        try {
            await connection.query(`
                CREATE DATABASE IF NOT EXISTS SnackKing;
                USE SnackKing;
            `);

            const [users] = await connection.query("SHOW TABLES LIKE 'User'");
            if (users.length === 0) {
                await connection.query(`
                    CREATE TABLE User (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        firstname VARCHAR(255) NOT NULL,
                        lastname VARCHAR(255) NOT NULL,
                        isAdmin BOOL NOT NULL,
                        password VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        adress VARCHAR(255) NOT NULL,
                        phone VARCHAR(255) NOT NULL
                    );
                `);
                console.log('Table User created')
            }

            const [commands] = await connection.query("SHOW TABLES LIKE 'Commands'");
            if (commands.length === 0) {
                await connection.query(`
                    CREATE TABLE Commands (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        dateCreated DATE NOT NULL,
                        dateShipped DATE,
                        status ENUM('Shipped','Prepared','In preparing') NOT NULL,
                        UserId int,
                        FOREIGN KEY (UserId) REFERENCES User(id)
                    );
                `);
                console.log('Table Commands created')
            }

            const [products] = await connection.query("SHOW TABLES LIKE 'Products'");
            if (products.length === 0) {
                await connection.query(`
                    CREATE TABLE Products (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        libelle VARCHAR(255) NOT NULL,
                        description TEXT,
                        price FLOAT NOT NULL,
                        images VARCHAR(255) NOT NULL,
                        category VARCHAR(255) NOT NULL
                    );
                `);
                console.log('Table Products created')
            }

            const [details_commands] = await connection.query("SHOW TABLES LIKE 'Details_Commands'");
            if (details_commands.length === 0) {
                await connection.query(`
                    CREATE TABLE Details_commands (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        quantity INT NOT NULL,      
                        CommandId int,
                        FOREIGN KEY (CommandId) REFERENCES User(id),
                        ProductId int,
                        FOREIGN KEY (ProductId) REFERENCES User(id)                     
                    );
                `)
                console.log('Table Details_Commands created')
            }

            return true;
        } catch(err) {
            console.error(err);
            return false;
        }
    }
}

module.exports = checkDB
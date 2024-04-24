
const checkDB = async (connection) => {
    const [databases] = await connection.query('SHOW DATABASES');
    if (!databases.some(database => database.Database === 'tp')) {
        await connection.query('CREATE DATABASE tp');
        console.log('Database created');
    }

    // Utiliser la base de données
    await connection.query('USE tp');

    // Vérifier si la table existe
    const [tables] = await connection.query('SHOW TABLES');
    if (!tables.some(table => table.Tables_in_tp === 'users')) {
        await connection.query(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log('Table created');
    }
}

module.exports = checkDB
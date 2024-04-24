
const createDB = require('./createBD')

const checkDB = async (connection) => {
    const [databases] = await connection.query('SHOW DATABASES');
    if (!databases.some(database => database.Database === 'tp')) {
        await connection.query('CREATE DATABASE tp');
        console.log('Database created');
    }

    // Utiliser la base de données
    await connection.query('USE tp');

    // Vérifier si les table existe
    await createDB(connection)

}

module.exports = checkDB
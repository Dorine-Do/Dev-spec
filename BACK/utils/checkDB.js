const createDB = require('./createBD')

const checkDB = async (connection) => {

    const [databases] = await connection.query('SHOW DATABASES');
    if (!databases.some(database => database.Database === 'SnackKing')) {
        try {
            // await createDB(connection)
            return true
        } catch(err) {
            console.error(err)
            return false
        }
    }

}

module.exports = checkDB
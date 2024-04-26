
// User
// Get  ----------------------------------------------------------------------------------------------------------------------------
const getUserById = async (connection, userId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM User WHERE id = ?`, [userId], (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération du user par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération du user par son ID' });
                return;
            }
    
            // Vérifier si un user avec cet ID a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'User non trouvé' });
                return;
            }
    
            // Renvoyer le user trouvé
            res.json(results[0]);
        })
    })

}

const getAllUsers = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM User`, (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération des users :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération des users' });
                return;
            }
    
            // Vérifier si un user a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Users non trouvés' });
                return;
            }
    
            // Renvoyer le user trouvé
            res.json(results[0]);
        })
    })
}
// Create  ----------------------------------------------------------------------------------------------------------------------------
const createUser = async (connection, datas) => {
    return new Promise((resolve, reject) => {
        
        connection.query(`
        INSERT INTO User (firstname,lastname,isAdmin,password,email,adress,phone) 
        VALUES (${datas.firstname},${datas.lastname},${datas.isAdmin},${datas.password},${datas.email},${datas.adress},${datas.phone} )`, 
        (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la création du user :', error);
                res.status(500).json({ message: 'Erreur lors de la création du user' });
                return;
            }else{
                res.status(200).json({ message: 'User créé' });
            }
        })
    })
}

// Update ----------------------------------------------------------------------------------------------------------------------------
const updateUserById = async (connection, datas, userId) => {

    return new Promise((resolve, reject) => {

        // Construit le requête SQL
        const baseSQL = `UPDATE User SET `;
        const paramsSQL = [];
        datas.forEach(element => {
              const keys = Object.keys(element);
              const key = keys[0]
              const value = element[key];
              paramsSQL.push(`${key} = ${value}`) 
        });
        const SQLUpdate = `${baseSQL}${paramsSQL.join(', ')} WHERE id = ?`;

        // Execution de la requête
        connection.query(`${SQLUpdate}`,[userId], (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la mise à jour du user par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la mise à jour du user par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'User créé' });
            }
        })
    })
}

// Delete ----------------------------------------------------------------------------------------------------------------------------
const deleteUserById = async (connection,userId) => {

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM User WHERE id = ?`, [userId] , (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la suppression du user par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la suppression du user par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'User suprimé' });
            }
        })
    })
}

module.exports = {
    getUserById,
    getAllUsers,
    createUser,
    updateUserById,
    deleteUserById
};
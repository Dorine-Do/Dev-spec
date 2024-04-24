
// Command
// Get  ----------------------------------------------------------------------------------------------------------------------------
const getCommandById = async (connection, commandId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Command WHERE id = ?`, [commandId], (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération du commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération du commande par son ID' });
                return;
            }
    
            // Vérifier si un commande avec cet ID a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Commande non trouvé' });
                return;
            }
    
            // Renvoyer le commande trouvé
            res.json(results[0]);
        })
    })

}

const getAllCommands = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Command`, (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération des commandes :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération des commandes' });
                return;
            }
    
            // Vérifier si les commandes ont été trouvées
            if (results.length === 0) {
                res.status(404).json({ message: 'Commandes non trouvées' });
                return;
            }
    
            // Renvoyer les commande trouvées
            res.json(results[0]);
        })
    })
}
// Create  ----------------------------------------------------------------------------------------------------------------------------
const createCommand = async (connection, datas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
        INSERT INTO Command (dateCreated, dateShipped, status, UserId) 
        VALUES (${datas.dateCreated},${datas.dateShipped},${datas.status},${datas.UserId} )`, 
        (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la création de la commande :', error);
                res.status(500).json({ message: 'Erreur lors de la création de la commande' });
                return;
            }else{
                res.status(200).json({ message: 'commande créé' });
            }
        })
    })
}

// Update ----------------------------------------------------------------------------------------------------------------------------
const updateCommandById = async (connection, datas, commandId) => {

    return new Promise((resolve, reject) => {

        // Construit le requête SQL
        const baseSQL = `UPDATE Command SET `;
        const paramsSQL = [];
        datas.forEach(element => {
              const keys = Object.keys(element);
              const key = keys[0]
              const value = element[key];
              paramsSQL.push(`${key} = ${value}`) 
        });
        const SQLUpdate = `${baseSQL}${paramsSQL.join(', ')} WHERE id = ?`;

        // Execution de la requête
        connection.query(`${SQLUpdate}`,[commandId], (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la mise à jour de la commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la mise à jour de la commande par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Commande mise à jour' });
            }
        })
    })
}

// Delete ----------------------------------------------------------------------------------------------------------------------------
const deleteCommandById = async (connection,commandId) => {

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM Command WHERE id = ?`, [commandId] , (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la suppression de la commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la suppression de la commande par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Commande suprimmée' });
            }
        })
    })
}

module.exports = {
    getCommandById,
    getAllCommands,
    createCommand,
    updateCommandById,
    deleteCommandById
};
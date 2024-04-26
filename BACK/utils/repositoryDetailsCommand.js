
// Details_command
// Get  ----------------------------------------------------------------------------------------------------------------------------
const getDetailsCommandById = async (connection, detailsCommandId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Details_command WHERE id = ?`, [detailsCommandId], (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération du detail de la commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération du detail de la commande par son ID' });
                return;
            }
    
            // Vérifier si un user avec cet ID a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Detail non trouvé' });
                return;
            }
    
            // Renvoyer le user trouvé
            res.json(results[0]);
        })
    })

}

const getAllDetailsCommands = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Details_command`, (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération des details de toutes les commandes :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération des details de toutes les commandes' });
                return;
            }
    
            // Vérifier si un user a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Details non trouvés' });
                return;
            }
    
            // Renvoyer le user trouvé
            res.json(results[0]);
        })
    })
}
// Create  ----------------------------------------------------------------------------------------------------------------------------
const createDetailsCommand = async (connection, datas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
        INSERT INTO Details_command (quantity,commandId,productId) 
        VALUES (${datas.quantity},${datas.commandId},${datas.productId})`, 
        (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la création du detail de la commande :', error);
                res.status(500).json({ message: 'Erreur lors de la création du detail de la commande' });
                return;
            }else{
                res.status(200).json({ message: 'Detail créé' });
            }
        })
    })
}

// Update ----------------------------------------------------------------------------------------------------------------------------
const updateDetailsCommandById = async (connection, datas, detailCommandId) => {

    return new Promise((resolve, reject) => {

        // Construit le requête SQL
        const baseSQL = `UPDATE Details_command SET `;
        const paramsSQL = [];
        datas.forEach(element => {
              const keys = Object.keys(element);
              const key = keys[0]
              const value = element[key];
              paramsSQL.push(`${key} = ${value}`) 
        });
        const SQLUpdate = `${baseSQL}${paramsSQL.join(', ')} WHERE id = ?`;

        // Execution de la requête
        connection.query(`${SQLUpdate}`,[detailCommandId], (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la mise à jour du detail de la commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la mise à jour du detail de la commande par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Detail de la commande créé' });
            }
        })
    })
}

// Delete ----------------------------------------------------------------------------------------------------------------------------
const deleteDetailsCommandById = async (connection,detailsCommandId) => {

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM Details_command WHERE id = ?`, [detailsCommandId] , (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la suppression du details de la commande par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la suppression du details de la commande par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Detail suprimé' });
            }
        })
    })
}

module.exports = {
    getDetailsCommandById,
    getAllDetailsCommands,
    createDetailsCommand,
    updateDetailsCommandById,
    deleteDetailsCommandById,
};
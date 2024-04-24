
// Product
// Get  ----------------------------------------------------------------------------------------------------------------------------
const getById = async (connection, productId) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Product WHERE id = ?`, [productId], (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération du produit par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération du produit par son ID' });
                return;
            }
    
            // Vérifier si un produit avec cet ID a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Produit non trouvé' });
                return;
            }
    
            // Renvoyer le produit trouvé
            res.json(results[0]);
        })
    })

}

const getAllProducts = async (connection) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM Product`, (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la récupération des produits :', error);
                res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
                return;
            }
    
            // Vérifier si un produit a été trouvé
            if (results.length === 0) {
                res.status(404).json({ message: 'Produit non trouvé' });
                return;
            }
    
            // Renvoyer le produit trouvé
            res.json(results[0]);
        })
    })
}
// Create  ----------------------------------------------------------------------------------------------------------------------------
const createProduct = async (connection, datas) => {
    return new Promise((resolve, reject) => {
        connection.query(`
        INSERT INTO Product (name, description, price, images) 
        VALUES (${datas.name},${datas.description},${datas.price},${datas.images} )`, 
        (error, results, fields) => {
       
            if (error) {
                console.error('Erreur lors de la création du produit :', error);
                res.status(500).json({ message: 'Erreur lors de la création du produit' });
                return;
            }else{
                res.status(200).json({ message: 'Produit créé' });
            }
        })
    })
}

// Update ----------------------------------------------------------------------------------------------------------------------------
const updateProductById = async (connection, datas, productId) => {

    return new Promise((resolve, reject) => {

        // Construit le requête SQL
        const baseSQL = `UPDATE Product SET `;
        const paramsSQL = [];
        datas.forEach(element => {
              const keys = Object.keys(element);
              const key = keys[0]
              const value = element[key];
              paramsSQL.push(`${key} = ${value}`) 
        });
        const SQLUpdate = `${baseSQL}${paramsSQL.join(', ')} WHERE id = ?`;

        // Execution de la requête
        connection.query(`${SQLUpdate}`,[productId], (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la mise à jour du produit par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la mise à jour du produit par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Produit mise à jour' });
            }
        })
    })
}

// Delete ----------------------------------------------------------------------------------------------------------------------------
const deleteProductById = async (connection,productId) => {

    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM Product WHERE id = ?`, [productId] , (error, results, fields) => {
            if (error) {
                console.error('Erreur lors de la suppression du produit par son ID :', error);
                res.status(500).json({ message: 'Erreur lors de la suppression du produit par son ID' });
                return;
            }else{
                res.status(200).json({ message: 'Produit suprimme' });
            }
        })
    })
}

module.exports = {
    getAllProducts,
    getById,
    createProduct,
    updateProductById,
    deleteProductById
};
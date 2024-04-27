const faker = require('@faker-js/faker')

    const createProducts = async (connection) => {
        const productsListing = [
            {name: 'Crêpe', description: 'NULL', price: 2, images: ['BACK/images/Crepe/crepe.jpeg','BACK/images/Crepe/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Gaufre', description: 'NULL', price: 2.50, images: ['BACK/images/Gauffre/gauffre.jpeg','BACK/images/Gauffre/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'PomPot', description: 'NULL', price: 3, images: ['BACK/images/PomPot/tour.jpeg','BACK/images/PomPot/PomPot1.jpg','BACK/images/PomPot\pompotes.jpeg'], category : 'Diet'},
            {name: 'Pain au chocolat', description: 'NULL', price: 1.50, images: ['BACK/images/Pain_au_chocolat/pain_au_chocolat.jpeg','BACK/images/Pain_au_chocolat/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Croissant', description: 'NULL', price: 1, images: ['BACK/images/Croissant/croissant.jpg','BACK/images/Croissant/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Yaourt', description: 'NULL', price: 2, images: ['BACK/images/Yaourt/telechargement.jpeg','BACK/images/Yaourt/yaourt.jpeg'], category : 'Diet'},
            {name: 'Pomme', description: 'NULL', price: 1, images: ['BACK/images/Pomme/pomme.jpeg','BACK/images/Pomme/telechargement.jpeg'], category : 'Diet'},
            {name: 'Chips', description: 'NULL', price: 3, images: ['BACK/images/Chips/chips.jpeg','BACK/images/Chips/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Pépito', description: 'NULL', price: 2.50, images: ['BACK/images/Pepito/pepito.jpeg','BACK/images/Pepito/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Brioche', description: 'NULL', price: 2, images: ['BACK/images/Brioches/brioche.jpeg','BACK/images/Brioches/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Brownie', description: 'NULL', price: 2, images: ['BACK/images/Brownie/brownie.jpeg','BACK/images/Brownie/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Pancake', description: 'NULL', price: 1, images: ['BACK/images/Pancakes/pancakes.jpeg','BACK/images/Pancakes/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Les petits écoliers', description: 'NULL', price: 2, images: ['BACK/images/Les_petits_ecoliers/images.jpeg','BACK/images/Les_petits_ecoliers\telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Kinder', description: 'NULL', price: 3, images: ['BACK/images/Kinder/kinder.jpg','BACK/images/Kinder/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Oreo', description: 'NULL', price: 3, images: ['BACK\images/Oreo/oreo.jpeg','BACK/images/Oreo/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Mikado', description: 'NULL', price: 3, images: ["BACK/images/Mikado/mikado.jpeg","BACK/images/Mikado/'telechargement.jpeg"], category : 'Biscuit'},
        ];

        const insertIntoSQProduct = `INSERT INTO Products (libelle, description, price, images, category) VALUES`
        const insertValuesProduct = [];

        // Ajouter les tableaux des produits en DB
        for (let i = 0; i < productsListing.length; i++) {
            insertValuesProduct.push(`("${productsListing[i].name}",NULL,${productsListing[i].price},"${productsListing[i].images}","${productsListing[i].category}")`)
        }

        connection.query(`${insertIntoSQProduct}${insertValuesProduct.join(', ')}`).catch((err)=>{console.log(err)})
    }
    

module.exports = {
    createProducts,
}

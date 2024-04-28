const faker = require('@faker-js/faker')

    const createProducts = async (connection) => {
        const productsListing = [
            {name: 'Crêpe', description: 'NULL', price: 2, images: ['/images/Crepe/crepe.jpeg','/images/Crepe/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Gaufre', description: 'NULL', price: 2.50, images: ['/images/Gauffre/gauffre.jpeg','/images/Gauffre/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'PomPot', description: 'NULL', price: 3, images: ['/images/PomPot/tour.jpeg','/images/PomPot/PomPot1.jpg','/images/PomPot\pompotes.jpeg'], category : 'Diet'},
            {name: 'Pain au chocolat', description: 'NULL', price: 1.50, images: ['/images/Pain_au_chocolat/pain_au_chocolat.jpeg','/images/Pain_au_chocolat/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Croissant', description: 'NULL', price: 1, images: ['/images/Croissant/croissant.jpg','/images/Croissant/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Yaourt', description: 'NULL', price: 2, images: ['/images/Yaourt/telechargement.jpeg','/images/Yaourt/yaourt.jpeg'], category : 'Diet'},
            {name: 'Pomme', description: 'NULL', price: 1, images: ['/images/Pomme/pomme.jpeg','/images/Pomme/telechargement.jpeg'], category : 'Diet'},
            {name: 'Chips', description: 'NULL', price: 3, images: ['/images/Chips/chips.jpeg','/images/Chips/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Pépito', description: 'NULL', price: 2.50, images: ['/images/Pepito/pepito.jpeg','/images/Pepito/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Brioche', description: 'NULL', price: 2, images: ['/images/Brioches/brioche.jpeg','/images/Brioches/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Brownie', description: 'NULL', price: 2, images: ['/images/Brownie/brownie.jpeg','/images/Brownie/telechargement.jpeg'], category : 'Viennoiserie'},
            {name: 'Pancake', description: 'NULL', price: 1, images: ['/images/Pancakes/pancakes.jpeg','/images/Pancakes/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Les petits écoliers', description: 'NULL', price: 2, images: ['/images/Les_petits_ecoliers/images.jpeg','/images/Les_petits_ecoliers/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Kinder', description: 'NULL', price: 3, images: ['/images/Kinder/kinder.jpg','/images/Kinder/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Oreo', description: 'NULL', price: 3, images: ['/images/Oreo/oreo.jpeg','/images/Oreo/telechargement.jpeg'], category : 'Biscuit'},
            {name: 'Mikado', description: 'NULL', price: 3, images: ["/images/Mikado/mikado.jpeg","/images/Mikado/telechargement.jpeg"], category : 'Biscuit'},
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

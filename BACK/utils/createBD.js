const faker = require('@faker-js/faker')


const randomUser = () => {
    return {
        fakeFirstname: faker.name.firstName(),
        fakeLastname: faker.name.lastName(),
        isAdmin: 0,
        password: generatePassword(),
        fakeEmail: faker.internet.email(),
        fakeAdress: faker.address.streetAddress(),
        fakePhone: faker.phone.phoneNumber()
    }
}

const createDB = async (connection) => {

    // Utiliser la base de données
    connection.query('USE SnackKing');

    // Récupère toutes les tables de la db 
    const [existTables] = await connection.query('SHOW TABLES');
    const expectTables = ['User', 'Command', 'Details_command', 'Product']

    // Filtre les existTables qui ne sont pas dans expectTables
    const missingTables = expectTables.filter(table => !existTables.includes(table));

    // Créer les tables manquantes avec des données factives
    expectTables.forEach(async table => {
        switch (table) {
            case 'User': // ------------------------------------------------------------------------------------------------------------------
                const [rows] = await connection.query(`SHOW TABLES LIKE '${table}'`);
                if (rows.length === 0) {
                    await connection.query(`
                        CREATE TABLE ${table} (
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
                }

                const insertIntoSQLUser = `INSERT INTO (firstname, lastname, isAdmin, password, email, adress, phone) VALUES `
                const insertValuesUser = [];
                // Création de User
                for (let i = 0; i < 10; i++) {
                    insertValuesUser.push(`(${randomUser.fakeFirstName}, ${randomUser.fakeLastName},${randomUser.isAdmin},${randomUser.password}, ${randomUser.fakeEmail}, ${randomUser.fakeAddress}, ${randomUser.fakePhoneNumber})`)
                }

                await connection.query(`${insertIntoSQLUser}${insertValuesUser.join(', ')}`);

                break;

            case 'Command': // ------------------------------------------------------------------------------------------------------
                SQL = `
                    CREATE TABLE ${table} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        dateCreated DATE NOT NULL,
                        dateShipped DATE,
                        status ENUM('Shipped','Prepared','In preparing') NOT NULL,
                        userId INT NOT NULL,
                        FOREIGN KEY (userId) REFERENCES User(id)
                    )
                `
                await connection.query(CommandSQL);

                // Requete SQL BASE
                const insertIntoSQLCommand = `INSERT INTO Command (dateCreated, dateShipped, status, UserId) VALUES `
                let insertValuesCommand = [];

                // Recup all users
                const [resultsUserId, fieldsUser] = await connection.query(`SELECT id FROM User`)

                // Les commandes envoyées (Shipped)
                for (let i = 0; i < 50; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    const userIdPicked = resultsUserId[Math.floor(Math.random() * resultsUserId.length)]
                    insertValuesCommand.push(`("${dateCreated}","${dateShipped}",'Shipped',"${userIdPicked.id}")`)
                }
                await connection.query(`${insertIntoSQLCommand}${insertValuesCommand.join(', ')}`);
                insertValuesCommand = [];

                //Les commandes préparées mais non envoyées (Prepared)
                for (let i = 0; i < 20; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    const userIdPicked = resultsUserId[Math.floor(Math.random() * resultsUserId.length)]
                    insertValuesCommand.push(`("${dateCreated}",NULL,'Prepared',"${userIdPicked.id}")`)
                }
                await connection.query(`${insertIntoSQLCommand}${insertValuesCommand.join(', ')}`);
                insertValuesCommand = [];


                // Les commandes en préparartion (In preparing)
                for (let i = 0; i < 20; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    const userIdPicked = resultsUserId[Math.floor(Math.random() * resultsUserId.length)]
                    insertValuesCommand.push(`("${dateCreated}",NULL,'In preparing',"${userIdPicked.id}")`)

                }
                await connection.query(`${insertIntoSQLCommand}${insertValuesCommand.join(', ')}`);
                insertValuesCommand = [];
                
                break;

            case 'Product': // --------------------------------------------------------------------------------------------------------------
                SQL = `
                    CREATE TABLE ${table} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        description TEXT,
                        price FLOAT NOT NULL,
                        images VARCHAR(255) NOT NULL
                    )
                `
                await connection.query(ProductSQL);

                const productsListing = [
                    {name: 'Crêpe', description: 'NULL', price: 2, images: ['BACK\\images\\Crepe\\crepe.jpeg','BACK\\images\\Crepe\\telechargement.jpeg']},
                    {name: 'Gaufre', description: 'NULL', price: 2.50, images: ['BACK\\images\\Gauffre\\gauffre.jpeg','BACK\\images\\Gauffre\\telechargement.jpeg']},
                    {name: 'PomPot', description: 'NULL', price: 3, images: ['BACK\\images\\PomPot\\tour.jpeg','BACK\\images\\PomPot\\PomPot1.jpg','BACK\\images\\PomPot\pompotes.jpeg']},
                    {name: 'Pain au chocolat', description: 'NULL', price: 1.50, images: ['BACK\\images\\Pain_au_chocolat\\pain_au_chocolat.jpeg','BACK\\images\\Pain_au_chocolat\telechargement.jpeg']},
                    {name: 'Croissant', description: 'NULL', price: 1, images: ['BACK\\images\\Croissant\\croissant.jpg','BACK\\images\\Croissant\\telechargement.jpeg']},
                    {name: 'Yaourt', description: 'NULL', price: 2, images: ['BACK\\images\\Yaourt\\telechargement.jpeg','BACK\\images\\Yaourt\\yaourt.jpeg']},
                    {name: 'Pomme', description: 'NULL', price: 1, images: ['BACK\\images\\Pomme\\pomme.jpeg','BACK\\images\\Pomme\\telechargement.jpeg']},
                    {name: 'Chips', description: 'NULL', price: 3, images: ['BACK\\images\\Chips\\chips.jpeg','BACK\\images\\Chips\\telechargement.jpeg']},
                    {name: 'Pépito', description: 'NULL', price: 2.50, images: ['BACK\\images\\Pepito\\pepito.jpeg','BACK\\images\\Pepito\\telechargement.jpeg']},
                    {name: 'Brioche', description: 'NULL', price: 2, images: ['BACK\\images\\Brioches\\brioche.jpeg','BACK\\images\\Brioches\\telechargement.jpeg']},
                    {name: 'Brownie', description: 'NULL', price: 2, images: ['BACK\\images\\Brownie\\brownie.jpeg','BACK\\images\\Brownie\\telechargement.jpeg']},
                    {name: 'Pancake', description: 'NULL', price: 1, images: ['BACK\\images\\Pancakes\\pancakes.jpeg','BACK\\images\\Pancakes\\telechargement.jpeg']},
                    {name: 'Les petits écoliers', description: 'NULL', price: 2, images: ['BACK\\images\\Les_petits_ecoliers\\images.jpeg','BACK\\images\\Les_petits_ecoliers\telechargement.jpeg']},
                    {name: 'Kinder', description: 'NULL', price: 3, images: ['BACK\\images\\Kinder\\kinder.jpg','BACK\\images\\Kinder\\telechargement.jpeg']},
                    {name: 'Oreo', description: 'NULL', price: 3, images: ['BACK\images\\Oreo\\oreo.jpeg','BACK\\images\\Oreo\\telechargement.jpeg']},
                    {name: 'Mikado', description: 'NULL', price: 3, images: ["BACK\\images\\Mikado\\mikado.jpeg","BACK\\images\\Mikado\\'telechargement.jpeg"]},
                ];

                const insertIntoSQProduct = `INSERT INTO Product (name, description, price, images) VALUES`
                const insertValuesProduct = [];

                // Ajouter les tableaux des produits en DB
                for (let i = 0; i < productsListing.length; i++) {
                    insertValuesProduct.push(`("${productsListing[i].name}",NULL,${productsListing[i].price},"${productsListing[i].images}")`)
                }
                await connection.query(`${insertIntoSQProduct}${insertValuesProduct.join(', ')}`);

                break;

            case 'Details_command': // ------------------------------------------------------------------------------------------------------

                SQL = `
                    CREATE TABLE ${table} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        quantity INT NOT NULL,      
                        commandId INT NOT NULL,
                        productId INT NOT NULL,
                        FOREIGN KEY (commandId) REFERENCES Command(id),
                        FOREIGN KEY (productId) REFERENCES Product(id)                     
                    )
                `
                await connection.query(Details_commandSQL);
                
                // Tableau pour stocker les paires commande-produit
                const [resultsCommand, fieldsCommand] =  await connection.query("SELECT * FROM Command")
                const [resultsProduct, fieldsProduct] =  await connection.query("SELECT * FROM Product")
                const insertValuesDetails_command = [];

                // Associer aléatoirement à une commande un produit
                for (let i = 0; i < 10; i++) {
                    // Choix aléatoire d'un produit et d'une commande dans le tableau
                    const randomCommand = resultsCommand[Math.floor(Math.random() * resultsCommand.length)];
                    const randomProduct = resultsProduct[Math.floor(Math.random() * resultsProduct.length)];
                    const quantity = [Math.floor(Math.random() * 10)];
                    insertValuesDetails_command.push( `(${quantity},${randomCommand.id},${randomProduct.id})` );
                }

                // Associer au moins à chaque commande à un produit
                for (let i = 0; i < resultsCommand.length ; i++) {
                    // Choix aléatoire d'un produit et d'une commande dans le tableau
                    const randomProductIndex = Math.floor(Math.random() * resultsProduct.length);
                    const randomProduct = resultsProduct[randomProductIndex];

                    const quantity = [Math.floor(Math.random() * 10)];
                    insertValuesDetails_command.push( `(${quantity},${resultsCommand[i].id},${randomProduct.id})` );
                }
              
                const insertIntoSQDetails_command = `INSERT INTO Details_command (quantity, CommandId, ProductId) VALUES`

                console.log('insertValuesDetails_command', insertValuesDetails_command)
                await connection.query(`${insertIntoSQDetails_command}${insertValuesDetails_command}`);

                break;
        }
            
    });

    function generatePassword() {
        let password = '';

        // Définir les caractères spéciaux et les chiffres possibles
        const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
        const numbers = '0123456789';

        // Générer un mot de passe jusqu'à ce qu'il remplisse toutes les contraintes
        while (
                password.length < 8 
            || 
                password.length > 25 
            || 
                !/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?]/.test(password) 
            || 
                !/\d/.test(password)
            ) 
        {
            // Générer un mot de passe aléatoire avec Faker
            password = faker.internet.password();

            // Vérifier la longueur et ajouter des caractères spéciaux et des chiffres si nécessaire
            if (password.length < 8 || password.length > 25) 
                continue;

            if (!/[!@#$%^&*()_+\-=\[\]{}|;:',.<>?]/.test(password)) {
                const randomSpecialChar = specialChars[Math.floor(Math.random() * specialChars.length)];
                password += randomSpecialChar;
            }
            if (!/\d/.test(password)) {
                const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
                password += randomNumber;
            }
        }

        return password;
    }

    function generateDates () {
        // Fonction pour générer une date aléatoire entre startDate et endDate
        function randomDate(startDate, endDate) {
            return new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        }
    
        // Fonction pour formater une date au format YYYY-MM-DD
        function formatDate(date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    
        // Générer une date entre aujourd'hui et N-1
        const today = new Date();
        const nDaysAgo = new Date(today);
        const numRand = Math.floor(Math.random())
        nDaysAgo.setDate(today.getDate() - numRand);
    
        const randomDate1 = randomDate(nDaysAgo, today);
        const formattedDate1 = formatDate(randomDate1);
    
        // Générer une deuxième date entre la date précédemment générée et aujourd'hui
        const randomDate2 = randomDate(new Date(Math.min(randomDate1, today)), today);
        const formattedDate2 = formatDate(randomDate2);
    
        return [formattedDate1, formattedDate2];
    }
    
    console.log('DB Crée')
};

module.exports = createDB
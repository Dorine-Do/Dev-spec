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
    missingTables.forEach(async table => {
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
                        UserId int,
                        FOREIGN KEY (UserId) REFERENCES User(UserId)
                    )
                `
                await connection.query(SQL);

                const insertIntoSQLCommand = `INSERT INTO (dateCreated, dateShipped, status) VALUES `
                const insertValuesCommand = [];

                // Les commandes envoyées (Shipped)
                for (let i = 0; i < 50; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    insertValuesCommand.push(`(${dateCreated},${dateShipped},'Shipped')`)
                }
                await connection.query(`${insertIntoSQLCommand}${insertValuesUser.join(', ')}`);
                insertValuesCommand = [];

                // Les commandes préparées mais non envoyées (Prepared)
                for (let i = 0; i < 20; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    insertValuesCommand.push(`(${dateCreated},NULL,'Prepared')`)
                }
                await connection.query(`${insertIntoSQLCommand}${insertValuesCommand.join(', ')}`);
                insertValuesCommand = [];

                // Les commandes en préparartion (In preparing)
                for (let i = 0; i < 20; i++) {
                    const [dateCreated, dateShipped]= generateDates()
                    insertValuesCommand.push(`(${dateCreated},NULL,'In preparing')`)

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
                await connection.query(SQL);

                const productsListing = [
                    {name: 'Crêpe', description: NULL, price: 2, images: ['BACK\images\Crepe\crepe.jpeg','BACK\images\Crepe\telechargement.jpeg']},
                    {name: 'Gaufre', description: NULL, price: 2.50, images: ['BACK\images\Gauffre\gauffre.jpeg','BACK\images\Gauffre\telechargement.jpeg']},
                    {name: 'PomPot', description: NULL, price: 3, images: ['BACK\images\PomPot\tour.jpeg','BACK\images\PomPot\PomPot1.jpg','BACK\images\PomPot\pompotes.jpeg']},
                    {name: 'Pain au chocolat', description: NULL, price: 1.50, images: ['BACK\images\Pain_au_chocolat\pain_au_chocolat.jpeg','BACK\images\Pain_au_chocolat\telechargement.jpeg']},
                    {name: 'Croissant', description: NULL, price: 1, images: ['BACK\images\Croissant\croissant.jpg','BACK\images\Croissant\telechargement.jpeg']},
                    {name: 'Yaourt', description: NULL, price: 2, images: ['BACK\images\Yaourt\telechargement.jpeg','BACK\images\Yaourt\yaourt.jpeg']},
                    {name: 'Pomme', description: NULL, price: 1, images: ['BACK\images\Pomme\pomme.jpeg','BACK\images\Pomme\telechargement.jpeg']},
                    {name: 'Chips', description: NULL, price: 3, images: ['BACK\images\Chips\chips.jpeg','BACK\images\Chips\telechargement.jpeg']},
                    {name: 'Pépito', description: NULL, price: 2.50, images: ['BACK\images\Pepito\pepito.jpeg','BACK\images\Pepito\telechargement.jpeg']},
                    {name: 'Brioche', description: NULL, price: 2, images: ['BACK\images\Brioches\brioche.jpeg','BACK\images\Brioches\telechargement.jpeg']},
                    {name: 'Brownie', description: NULL, price: 2, images: ['BACK\images\Brownie\brownie.jpeg','BACK\images\Brownie\telechargement.jpeg']},
                    {name: 'Pancake', description: NULL, price: 1, images: ['BACK\images\Pancakes\pancakes.jpeg','BACK\images\Pancakes\telechargement.jpeg']},
                    {name: 'Les petits écoliers', description: NULL, price: 2, images: ['BACK\images\Les_petits_ecoliers\images.jpeg','BACK\images\Les_petits_ecoliers\telechargement.jpeg']},
                    {name: 'Kinder', description: NULL, price: 3, images: ['BACK\images\Kinder\kinder.jpg','BACK\images\Kinder\telechargement.jpeg']},
                    {name: 'Oreo', description: NULL, price: 3, images: ['BACK\images\Oreo\oreo.jpeg','BACK\images\Oreo\telechargement.jpeg']},
                    {name: 'Mikado', description: NULL, price: 3, images: ['BACK\images\Mikado\mikado.jpeg','BACK\images\Mikado\'telechargement.jpeg']},
                ];

                const insertIntoSQProduct = `INSERT INTO (name, description, price, images) VALUES`
                const insertValuesProduct = [];

                // Ajouter les tableaux des produits en DB
                for (let i = 0; i < productsListing.length; i++) {
                    insertValuesProduct.push(`(${productsListing[i].name},NULL,${productsListing[i].price},${productsListing[i].images})`)
                }

                await connection.query(`${insertIntoSQProduct}${insertValuesProduct.join(', ')}`);

                break;

            case 'Details_command': // ------------------------------------------------------------------------------------------------------

                SQL = `
                    CREATE TABLE ${table} (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        quantity INT NOT NULL,      
                        CommandId int,
                        FOREIGN KEY (CommandId) REFERENCES User(CommandId)
                        ProductId int,
                        FOREIGN KEY (ProductId) REFERENCES User(ProductId)                     
                    )
                `
                
                // Tableau pour stocker les paires commande-produit
                const orderList = [];

                const commands = await connection.query(`SELECT * FROM commands`)
                const products = await connection.query(`SELECT * FROM products`)
                
                // Associer aléatoirement à une commande un produit
                for (let i = 0; i < 10; i++) {
                    // Choix aléatoire d'un produit et d'une commande dans le tableau
                    const randomCommand = commands[Math.floor(Math.random() * commands.length)];
                    const randomProduct = products[Math.floor(Math.random() * products.length)];
                    orderList.push({ command: randomCommand, product: randomProduct });
                }

                // Associer au moins à chaque commande à un produit
                commands.forEach(command => {
                    // Choix aléatoire d'un produit dans le tableau
                    const randomProduct = products[Math.floor(Math.random() * products.length)];

                    // Supprimer le produit choisi du tableau pour éviter qu'il ne soit réutilisé
                    products.splice(randomProductIndex, 1);

                    // Ajouter la paire commande-produit à la liste
                    orderList.push({ command: command, product: randomProduct });
                });

                const insertIntoSQDetails_command = `INSERT INTO (quantity, CommandId, ProductId) VALUES`
                const insertValuesDetails_command = [];

                // Ajouter les paires commandes/produit à la db
                for (let i = 0; i < orderList.length; i++) {
                    insertValuesDetails_command.push(`(${orderList[i].quantity}, ${orderList[i].command}, ${orderList[i].product})`)
                }
                await connection.query(`${insertIntoSQDetails_command}${insertValuesDetails_command.join(', ')}`);

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
        nDaysAgo.setDate(today.getDate() - N); // Remplacer N par le nombre de jours souhaité

        const randomDate1 = randomDate(nDaysAgo, today);
        const formattedDate1 = formatDate(randomDate1);

        // Générer une deuxième date entre la date précédemment générée et aujourd'hui
        const randomDate2 = randomDate(randomDate1, today);
        const formattedDate2 = formatDate(randomDate2);

        return [formattedDate1, randomDate2]
    }
    
    console.log('DB Crée')
};

module.exports = createDB
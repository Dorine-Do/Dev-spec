# Dev-spec

# Projet en dev-spec
Spé Dev LiveCampus

# Guide d’exécution de notre API WEB

Pré-requis :

**Assurez-vous d’avoir** :

- Un environnement de développement intégré de fonctionnel (IDE)
- Un accès MySql
- Node JS et express d’installé

**Configuration de la BDD** :

Dans le fichier “/BACK/utils/connectDB.js”, vérifiez vos identifiants de connexion à la base
de données.

Tous les produits seront créés au même moment que la création de la BDD, à l’exécution du
back-end.

**Installation des dépendances** :

Une fois que Node JS est installé, pensez à exécuter la commande “npm i” dans le dossier
back-end et le dossier front-end.

**Exécution du projet** :

Tapez dans le shell du back et du front la commande suivante “node app.js” pour exécuter
le projet et lancer les deux serveurs.

Utilisation de l'Application :

- Page d'Accueil : Vous pouvez rechercher des produits sans être connecté,
vous rendre sur la page d’inscription et connexion.
- Inscription : Créez un compte pour accéder à plus de fonctionnalités.
- Connexion : connectez-vous à votre compte une fois qu'il est créé.
- Produits : Visualisez, ajoutez, modifiez ou supprimez des produits une fois
connecté.
- Panier : Consultez les produits ajoutés à votre panier.
- Statistiques : Accédez aux statistiques via l'URL localhost:3000/stats

_Pour le CSRF, on souhaitais intaller la librairie : csurf._

```
app.use(csrf()); 
res.locals.csrfToken = req.csrfToken()
app.use((req, res, next) => {
    // subString 2 car sinon pas assez complexe
    const nonce = (Math.random() + 1).toString(36).substring(2);
    req.nonce = nonce;

    res.locals.csrfToken = req.csrfToken()
    // Checked avec https://csp-evaluator.withgoogle.com/
    res.appendHeader('Content-Security-Policy', form-action 'self'; img-src 'self'; style-src 'nonce-${nonce}' https://cdn.jsdelivr.net; script-src 'nonce-${nonce}' https://cdn.jsdelivr.net 'strict-dynamic' 'unsafe-inline'; object-src 'none'; base-uri 'self'; )

    // Chrome ?
    // res.appendHeader('Reporting-Endpoints', 'nom-groupe-csp="votre-url"');

    next();
})
```
_On devait mettre le code ci-dessous sur toutes les routes_
```csrfToken: req.csrfToken()```


Dorine
Baptiste
Antonin

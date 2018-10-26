const timeout = 15000

// test sur la page sign-up
describe("Sign Up", () => {
    let page

    //test affichage sign Up
    test('home and sign-up', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('nav[role="navigation"]')
        // click sur le lien "Sign Up" de la navigation
        await page.evaluate(() => {
            Array
                .from(document.querySelectorAll('#navbar li a'))
                .filter(el => el.textContent === 'Sign Up')[0].click();
        });
        // on attent que l'élément ".container" soit chargé
        await page.waitForSelector('.container')
        // on récupère le code HTML
        const html = await page.$eval('.container', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères et la balise form
        expect(html).toContain("Register", 'form')
    }, timeout)

    test('create register', async () => {
        // charger la page d'accueil
        await page.goto('http://polr.campus-grenoble.fr/signup')
        // attendre que l'élément <form> soit chargé
        await page.waitForSelector('form')
        // insérer du contenu dans le formulaire; on insère le nom de l'utilisateur
        await page.type('form[action="/signup"] input[name="username"]', "leilaTest");
        //le mot de passe
        await page.type('form[action="/signup"] input[name="password"]', "testpassword");
        //l'adresse mail
        await page.type('form[action="/signup"] input[name="email"]', "test123@test.com");
        //capture de l'écran pour vérifier que les données ont bie été insérées
        await page.screenshot({path: './tests/img/username.png'});
        //cliquer sur le bouton submit pour soumettre la création utilisateur
        await page.$eval('.btn-default', el => el.click());
        //se connecter en tant qu'admin pour supprimer l'utilisateur
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('#navbar li a')
        // click sur le lien "Sign In" de la navigation
        await page.$eval( '.dropdown-toggle', el => el.click() );
        // on attent que l'élément ".dropdown-toggle" soit chargé
        await page.waitForSelector('.dropdown-toggle')
        //insère le nom de l'utilisateur
        await page.type('form[action="login"] input[name="username"]', "admin");
        await page.type('form[action="login"] input[name="password"]', "campus");
        await page.$eval('.btn-success', el => el.click());

        await page.goto('http://polr.campus-grenoble.fr/admin#admin')
        //on tape un texte dans la barre de recherche avec un delai de réponse
        await page.type('#admin_users_table_filter input[type="search"]', "leilaTest", {delay:100})
        const btndelete = await page.$eval('#admin_users_table tr td a.btn-danger', e => e.innerHTML)
        // on vérifie qu'il contient la bonne chaîne de caractères
        expect(btndelete).toContain("Delete")
        await page.screenshot({path: './tests/img/admin-search-user.png'});
        //on clique sur le bouton
        await page.$eval('#admin_users_table tr td a.btn-danger', el => el.click());

    }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage();
        //par défaut cliquer ok sur pop-up du navigateur
        page.on('dialog',async dialog => {
            await dialog.accept();
        });
    }, timeout)

});
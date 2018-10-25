const timeout = 15000

// série de tests sur la page d'accueil
describe("Tests sign in", () => {
    let page
//test affichage sign In
    test('home and sign-in', async () => {
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
        // await page.screenshot({path: './tests/img/login.png'});
    }, timeout)

// cette fonction est lancée avant chaque test de cette
// série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

})
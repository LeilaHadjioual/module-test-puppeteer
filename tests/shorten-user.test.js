const timeout = 15000

// test d'un raccourcisseur d'URL
describe("Shorten User", () => {
    let page

    // vérification du chargement de la page d'accueil
    test('shorten user', async () => {
        await page.goto('http://polr.campus-grenoble.fr')
        await page.waitForSelector('nav[role="navigation"]')
        // click sur le lien "Sign In" de la navigation
        await page.$eval('.dropdown-toggle', el => el.click());
        // on attent que l'élément ".dropdown-toggle" soit chargé
        await page.waitForSelector('.dropdown-toggle')
        //insère le nom de l'utilisateur
        await page.type('form[action="login"] input[name="username"]', "leila");
        await page.type('form[action="login"] input[name="password"]', "leila");
        await page.$eval('.btn-success', el => el.click());
        await page.waitForSelector('.long-link-input')
        await page.type('.long-link-input', 'https://www.auvergnerhonealpes.fr/153-formations-autour-du-numerique.htm');
        await page.screenshot({path: './tests/img/shorten-url.png'});
        await page.waitForSelector('#shorten')
        await page.$eval('#shorten', el => el.click());
        await page.waitForSelector('#short_url')
        const val = await page.$eval('#short_url', el => el.value)
        expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/[0-9]+/)
        await page.screenshot({path: './tests/img/shorten-url-user.png'});
        await page.waitForSelector('.dropdown-toggle')
        await page.$eval('.dropdown-toggle', el => el.click());
        // on attent que l'élément ".dropdown-toggle" soit chargé
        await page.waitForSelector('ul.dropdown-menu')
        //on vérifie que la chaine de caractère "logout" s'affiche
        const exit = await page.$eval('ul.dropdown-menu', e => e.innerHTML)
        expect(exit).toContain("Logout")
        //on clique sur le lien "Logout"
        await page.$eval('ul.dropdown-menu li:last-child a', el => el.click());
        const logout = await page.$eval('.dropdown-toggle', e => e.innerHTML)
        expect(logout).toContain("Sign In")
        await page.screenshot({path: './tests/img/logout.png'});

    }, timeout)

    // test('link options', async () => {
    //     await page.goto('http://polr.campus-grenoble.fr')
    //     await page.waitForSelector('#navbar li a')
    //     // click sur le lien "Sign In" de la navigation
    //     await page.$eval('.dropdown-toggle', el => el.click());
    //     // on attent que l'élément ".dropdown-toggle" soit chargé
    //     await page.waitForSelector('.dropdown-toggle')
    //     await page.screenshot({path: './tests/img/logout.png'});
    //     //insère le nom de l'utilisateur
    //     await page.type('form[action="login"] input[name="username"]', "leila");
    //     await page.type('form[action="login"] input[name="password"]', "leila");
    //     await page.$eval('.btn-success', el => el.click());
    //     await page.waitForSelector('.long-link-input')
    //     await page.type('.long-link-input', 'https://www.auvergnerhonealpes.fr/153-formations-autour-du-numerique.htm');
    //     await page.screenshot({path: './tests/img/shorten-url.png'});
    //     await page.waitForSelector('#shorten')
    //     await page.$eval('#shorten', el => el.click());
    //     await page.waitForSelector('#short_url')
    //     const val = await page.$eval('#short_url', el => el.value)
    //     expect(val).toMatch(/^http:\/\/polr\.campus\-grenoble\.fr\/[0-9]+/)
    //     await page.screenshot({path: './tests/img/shorten-url-user.png'});


    // }, timeout)

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
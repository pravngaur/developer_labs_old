const { I, data, homePage, loginPage } = inject();

// For going to the login landing page
Given('shopper goes to the Login Page', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":6,"column":9}
    I.amOnPage(data.login.homePage);
    homePage.accept();
    I.amOnPage(data.login.loginPage);
});

// For going to the login landing page and signing in
Then('shopper logs into the website', () => {
    I.amOnPage(data.login.homePage);
    homePage.accept();
    I.amOnPage(data.login.loginPage);
    loginPage.login(data.login.email, data.login.password);
});

Given('shopper logs into the website on phone', () => {
    I.amOnPage(data.login.homePage);
    homePage.accept();

    I.seeElement('.navbar-toggler.d-md-none');
    I.click('.navbar-toggler.d-md-none');

    let locator = locate('.nav-item.d-lg-none')
      .withChild('a.nav-link');
    I.waitForElement(locator);
    I.click(locator);

    loginPage.login(data.login.email, data.login.password);
});

Given('shopper logs into the website on tablet', () => {
    I.amOnPage(data.login.homePage);
    homePage.accept();

    let locator = locate('.nav-item.d-lg-none')
      .withChild('a.nav-link');
    I.waitForElement(locator);
    I.click(locator);

    loginPage.login(data.login.email, data.login.password);
});

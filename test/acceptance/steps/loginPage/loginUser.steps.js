const { I, data, homePage, loginPage } = inject();
var should = require('should'); // eslint-disable-line

Given('shopper goes to the Login Page', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":6,"column":9}
    I.amOnPage(data.login.homePage);
    homePage.accept();
    homePage.clickLogin();
});

Then('shopper logs into the website', async () => {
    I.amOnPage(data.login.homePage);
    homePage.accept();
    console.log("Accepted");
    await loginPage.login(data.login.email, data.login.password, data.login.currentUrl);
    console.log("Logged In");
});

const { I, data, homePage, loginPage } = inject();
var should = require('should'); // eslint-disable-line

Given('shopper goes to the Login Page', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":6,"column":9}
    I.amOnPage(data.login.homePage);
    homePage.accept();
    homePage.clickLogin();
});
  
Then('shopper logs into the website', () => {
    I.amOnPage(data.login.homePage);
    homePage.accept();
    homePage.clickLogin();
    loginPage.fillLoginForm(data.login.email, data.login.password);
    I.waitForElement(loginPage.locators.primaryButton);
    I.click(loginPage.locators.primaryButton);
    I.seeInCurrentUrl(data.login.currentUrl);
});
const { I, data, homePage, loginPage } = inject();
var should = require('should'); // eslint-disable-line

Given('shopper goes to the Login Page', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":6,"column":9}
    I.amOnPage(data.login.homePage);
    homePage.accept();
    homePage.clickLogin();
});
  
Then('shopper is able to fill out the email and password', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":7,"column":9}
    loginPage.fillLoginForm(data.login.email, data.login.password);
});

Then('shopper is able to click the login button', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":8,"column":9}
    I.waitForElement(loginPage.locators.primaryButton);
    I.click(loginPage.locators.primaryButton);
});

Then('shopper is able to view profile dashboard', () => {
    // From "test/acceptance/features/loginPage/loginUser.feature" {"line":9,"column":9}
    I.seeInCurrentUrl(data.login.currentUrl);
});
  
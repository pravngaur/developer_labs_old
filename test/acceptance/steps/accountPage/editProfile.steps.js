const { I, data, homePage } = inject();
var should = require('should'); // eslint-disable-line

Then('shopper clicks edit profile', () => {
    // From "test/acceptance/features/accountPage/editProfile.feature"
    I.waitForElement(accountPage.locators.editAccount);
    I.click(accountPage.locators.editAccount);
});
  
Then('shopper edits phone number', () => {
    // From "test/acceptance/features/accountPage/editProfile.feature"
    I.click(homePage.locators.subscribeButton);
    I.waitForElement(homePage.locators.emailSignup);
    I.see("Email Signup successful");
});
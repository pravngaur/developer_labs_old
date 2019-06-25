const { I, data, homePage, accountPage, login } = inject();

// use login to inject auto-login function
Before(login => {
    login('user'); // login using user session
});

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
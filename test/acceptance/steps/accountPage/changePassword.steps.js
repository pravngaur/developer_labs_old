const { I, data, accountPage, login } = inject();

// use login to inject auto-login function
Before(login => {
    login('user'); // login using user session
});

Then('shopper clicks edit password', () => {
    // From "test/acceptance/features/accountPage/changePassword.feature"
    I.waitForElement(accountPage.locators.editPassword);
    I.click(accountPage.locators.editPassword);
});
  
Then('And shopper changes their password', () => {
    // From "test/acceptance/features/accountPage/changePassword.feature"
    accountPage.changePassword(data.login.password, data.account.newPassword);
    I.see("Password changed!");
});

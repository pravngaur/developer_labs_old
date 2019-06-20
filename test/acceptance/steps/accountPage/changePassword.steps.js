const { I, data, accountPage } = inject();

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

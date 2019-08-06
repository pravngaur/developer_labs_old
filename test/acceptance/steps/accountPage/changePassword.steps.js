const { I, data, accountPage } = inject();

Then('shopper clicks edit password', () => {
    accountPage.clickEditPassword();
});

Then('shopper changes their password', () => {
    // From "test/acceptance/features/accountPage/changePassword.feature"
    accountPage.changePassword(data.login.password, data.account.newPassword);
});

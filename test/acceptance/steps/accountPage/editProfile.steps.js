const { I, data, accountPage } = inject();

Then('shopper clicks edit profile', () => {
    accountPage.clickEditProfile();
});

Then('shopper edits phone number', () => {
    // From "test/acceptance/features/accountPage/editProfile.feature"
    accountPage.editProfile(data.login.phone, data.login.email, data.login.password);
});

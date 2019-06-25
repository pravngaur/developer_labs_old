const { I, data, homePage, accountPage, login } = inject();

// use login to inject auto-login function
Before(login => {
    login('user'); // login using user session
});

Then('shopper clicks edit profile', () => {
    // From "test/acceptance/features/accountPage/editProfile.feature"
    I.amOnPage('/on/demandware.store/Sites-RefArch-Site/en_US/Account-EditProfile');
});
  
Then('shopper edits phone number', () => {
    // From "test/acceptance/features/accountPage/editProfile.feature"
    accountPage.editProfile(data.login.phone,data.login.email, data.login.password);
});
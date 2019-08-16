const { I, data, accountPage } = inject();

Then('shopper clicks edit profile', () => {
    accountPage.clickEditProfile();
});

Then('shopper edits phone number', () => {
    accountPage.editProfile(data.login.phone, data.login.email, data.login.password);
});

Given('shopper views address book', () => {
    accountPage.clickAddressBook();
});

Given('shopper edits address', () => {
    accountPage.clickEditAddress(data.account.addressTitle);
    accountPage.editAddress(data.account.addressHome);
    I.wait(1);
    accountPage.clickEditAddress(data.account.addressHome);
    accountPage.editAddress(data.account.addressTitle);
  });

const { I, data, accountPage, login } = inject();

// use login to inject auto-login function
Before(login => {
    login('user'); // login using user session
});

Then('shopper clicks add new address', () => {
    // From "test/acceptance/features/accountPage/addAddress.feature"
    I.click(accountPage.locators.addressBook);
});
  
Then('shopper fills out address information', () => {
    // From "test/acceptance/features/accountPage/addAddress.feature"
    accountPage.addAddress(data.account.addressTitle, data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.country, data.checkout.state, data.checkout.zip, data.checkout.phone);
    I.see("Address Added");
});
const { I, data, accountPage, login } = inject();

// use login to inject auto-login function
Before(login => {
    login('user'); // login using user session
});

Then('shopper clicks add new payment', () => {
    // From "test/acceptance/features/accountPage/addPayment.feature"
    I.amOnPage('/on/demandware.store/Sites-RefArch-Site/en_US/PaymentInstruments-AddPayment');
});
  
Then('shopper fills out payment information', () => {
    // From "test/acceptance/features/accountPage/addPayment.feature"
    accountPage.addPayment(data.account.name, data.checkout.ccNum, data.checkout.expMonth, data.checkout.expYear);
});
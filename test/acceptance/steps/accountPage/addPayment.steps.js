const { I, data, accountPage } = inject();

Then('shopper clicks add new payment', () => {
    // From "test/acceptance/features/accountPage/addPayment.feature"
    I.click(accountPage.locators.payment);
});
  
Then('shopper fills out payment information', () => {
    // From "test/acceptance/features/accountPage/addPayment.feature"
    accountPage.addPayment(data.account.name, data.checkout.ccNum, data.checkout.expMonth, data.checkout.expYear);
    I.see("Password Changed");
});
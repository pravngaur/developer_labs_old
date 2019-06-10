const { I, data, cartPage } = inject();

Then('shopper selects checkout from cart', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":11,"column":9}
    I.waitForElement(cartPage.locators.checkoutBtn);
    I.click(cartPage.locators.checkoutBtn);
  });
  
  Then('shopper selects checkout as guest', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":12,"column":9}
    I.waitForElement(cartPage.locators.checkoutAsGuestBtn);
    I.click(cartPage.locators.checkoutAsGuestBtn);
  });
  
  Then('shopper fills out shipping information', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":13,"column":9}
    cartPage.fillShippingInfo(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.country, data.checkout.state, data.checkout.city, 
        data.checkout.zip, data.checkout.phone);
    I.waitForElement(cartPage.locators.toPayment);
    I.click(cartPage.locators.toPayment);
  });
  
  Then('shopper fills out payment information', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":14,"column":9}
    cartPage.fillPaymentInfo(data.checkout.email, data.checkout.phone, data.checkout.ccNum, 
        data.checkout.expMonth, data.checkout.expYear, data.checkout.ccSecCode);
    I.waitForElement(cartPage.locators.placeOrder);
    I.click(cartPage.locators.placeOrder);
  });
  
//   Then('shopper verifies the correct sale information', () => {
//     // From "test/acceptance/features/suites/happyPath.feature" {"line":15,"column":9}
//     throw new Error('Not implemented yet');
//   });
  
  Then('shopper places order', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":16,"column":9}
    I.waitForElement(cartPage.locators.confirmOrder);
    I.click(cartPage.locators.confirmOrder);
  });

//   Then('shopper verifies final reciept', () => {
//     // From "test/acceptance/features/suites/happyPath.feature" {"line":17,"column":9}
//     throw new Error('Not implemented yet');
//   });
  
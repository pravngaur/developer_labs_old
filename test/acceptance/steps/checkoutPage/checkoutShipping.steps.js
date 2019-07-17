const { I, data, cartPage, checkoutPage } = inject();

Then('shopper selects checkout from cart', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":11,"column":9}
    I.waitForElement(cartPage.locators.checkoutBtn);
    I.click(cartPage.locators.checkoutBtn);
});

Then('shopper selects checkout as guest', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":12,"column":9}
    I.waitForElement(checkoutPage.locators.checkoutAsGuestBtn);
    I.click(checkoutPage.locators.checkoutAsGuestBtn);
});

Then('shopper selects checkout as return user', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":12,"column":9}
    checkoutPage.fillReturnCustomerInfo(data.login.email, data.login.password);
    I.waitForElement(checkoutPage.locators.checkoutAsRegisteredBtn);
    I.click('Login');
});

Then('shopper fills out shipping information', () => {
    // From "test/acceptance/features/suites/happyPath.feature" {"line":13,"column":9}
    checkoutPage.fillShippingInfo(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.country, data.checkout.state, data.checkout.city,
        data.checkout.zip, data.checkout.phone);
});

Then('shopper verifies shipping information', () => {
    checkoutPage.verifyShipping(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.city, data.checkout.stateAbr, data.checkout.zip);
});

Then('shopper procedes to payment section', () => {
    I.waitForElement(checkoutPage.locators.toPayment);
    I.click(checkoutPage.locators.toPayment);
});

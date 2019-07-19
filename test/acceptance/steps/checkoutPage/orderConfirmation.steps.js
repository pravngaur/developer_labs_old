const { I, data, checkoutPage } = inject();

Then('shopper fills out billing information', () => {
    checkoutPage.fillPaymentInfoGuest(data.checkout.email, data.checkout.phone, data.checkout.ccNum,
        data.checkout.expMonth, data.checkout.expYear, data.checkout.ccSecCode);
});

Then('shopper fills out registered user billing information', () => {
    checkoutPage.fillPaymentInfoRegistered(data.checkout.email, data.checkout.phone, data.checkout.ccSecCode)
});

Then('shopper places order', () => {
    I.waitForElement(checkoutPage.locators.placeOrder);
    I.click(checkoutPage.locators.placeOrder);
    checkoutPage.verifyCheckoutInfo(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.city, data.checkout.zip, data.checkout.phone,
        data.checkout.email, data.checkout.ccNum, data.checkout.ccExpDate, data.product.quantity,
        data.product.totalItemPrice, data.product.shipping, data.product.tax, data.product.estimatedTotal);
    I.waitForElement(checkoutPage.locators.confirmOrder);
    I.click(checkoutPage.locators.confirmOrder);
});

Then('shopper verifies the order confirmation page', () => {
    checkoutPage.verifyOrderConfirmation(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.city, data.checkout.zip, data.checkout.phone,
        data.checkout.email, data.checkout.ccNum, data.checkout.ccExpDate, data.product.quantity,
        data.product.totalItemPrice, data.product.shipping, data.product.tax, data.product.estimatedTotal);
});

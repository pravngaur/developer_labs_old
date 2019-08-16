const { data, checkoutPage } = inject();

Then('shopper ships to more than one address', () => {
    checkoutPage.multiShipEnabled();
    checkoutPage.clickEnterAddress(1);
    checkoutPage.fillShippingInfo(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.country, data.checkout.state, data.checkout.city,
        data.checkout.zip, data.checkout.phone);
    checkoutPage.saveAddress();
    checkoutPage.clickEnterAddress(2);
    checkoutPage.fillShippingInfo(data.checkout.fName, data.checkout.lName, data.checkout.address1,
        data.checkout.address2, data.checkout.country, data.checkout.state, data.checkout.city,
        data.checkout.zip, data.checkout.phone);
    checkoutPage.saveAddress();
});

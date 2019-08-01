const { I, homePage, productPage, data } = inject();

Then('shopper searches for category from menu', () => {
    homePage.searchMenu();
});

Then('shopper opens product quick view from product display page', () => {
    productPage.openProductQuickView(data.product3.productLinkQV);
});

Then('shopper selects color from Quick View', () => {
    productPage.selectQuickViewColor(data.product3.color);
});

Then('shopper selects size from Quick View', () => {
    productPage.selectQuickViewSize(data.product3.size);
});

Then('shopper adds to cart from Quick View', () => {
    productPage.addToCartQuickView();
    I.waitForVisible('.alert.alert-success.add-to-basket-alert');
});


const { I, homePage, productPage, data } = inject();
let product;

Then('shopper opens quickview on a product tiles', () => {
    homePage.openProductQuickView(data.product2.name);
});

Then('shopper chooses a quickview product color', () => {
    homePage.selectQuickViewColor(data.product2.color);
});

Then('shopper chooses a quickview product size', () => {
    homePage.selectQuickViewSize(data.product2.size);
});

Then('shopper adds product to cart from quickview', () => {
    homePage.addToCartQV(data.product2);
    productPage.viewCart();
});

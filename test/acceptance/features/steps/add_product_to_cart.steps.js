const { I, homePage, productPage, cartPage } = inject();
let product;

Given('Shopper searches for {string}', (product) => {
    this.product = product;
    homePage.search(product);
});

When('selects size {string}', (size) => {
    productPage.selectSize(size);
});

When('he adds the product to cart', () => {
    productPage.addToCart();
    productPage.viewCart();
});

Then('he is able to see the correct product in cart', () => {
    I.see(this.product, cartPage.locators.lineItemName);
});

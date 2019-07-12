const { I, data, homePage, productPage, cartPage } = inject();
let product;

Given('Shopper searches for {string}', (inputProduct) => {
    product = inputProduct;
    homePage.search(product);
});

When('selects size {string}', (size) => {
    productPage.selectSize(size);
});

When('shopper changes product quantity', () => {
    productPage.selectQuantity(data.product.quantity);
});

When('he adds the product to cart', async () => {
    productPage.addToCart();
    productPage.viewCart();
});

Then('he is able to see the correct product in cart', () => {
    I.see(product, cartPage.locators.lineItemName);
    cartPage.verifyCart(data.product.quantity, data.product.itemPrice, data.product.totalItemPrice,
        data.product.shipping, data.product.tax, data.product.estimatedTotal);
});

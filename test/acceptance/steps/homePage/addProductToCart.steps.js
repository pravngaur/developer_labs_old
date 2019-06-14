const { I, homePage, productPage, cartPage } = inject();
let product;

Given('Shopper searches for {string}', (inputProduct) => {
    product = inputProduct;
    homePage.search(product);
});

When('selects size {string}', (size) => {
    productPage.selectSize(size);
});

When('he adds the product to cart', async () => {
    productPage.addToCart();
    I.waitForElement(productPage.locators.addToCartSuccess);
    (await productPage.grabAddToCartSuccessMsg()).should.equal('Product added to cart');
    (await productPage.grabMiniCartQuantity())[0].should.equal('1');
    productPage.viewCart();
});

Then('he is able to see the correct product in cart', () => {
<<<<<<< HEAD
    I.see(this.product, cartPage.locators.lineItemName);
=======
    I.see(product, cartPage.locators.lineItemName);
>>>>>>> 68f70a040eb22e8410c359dbd837251234056637
});

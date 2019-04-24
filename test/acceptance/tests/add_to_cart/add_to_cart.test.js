const { I, homePage, productPage, cartPage } = inject();

Feature('Add to Cart');

Before((I) => {
    I.amOnPage('/s/RefArch/home?lang=en_US');
    homePage.accept();
});

Scenario('Fred is able to search and add a product to cart', async (I) => {

    homePage.searchAndSelect('Elbow Sleeve Ribbed Sweater');
    productPage.selectSize('S');
    productPage.addToCart();
    productPage.viewCart();

    I.see(this.product, cartPage.locators.lineItemName);
}).tag('@add_to_cart_traditional_test')
    
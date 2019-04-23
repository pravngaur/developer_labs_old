// Add in your custom step files
// use I and productPage via inject() function
const { I, homePage, productPage, cartPage } = inject();
import {expect} from 'chai';
let product;

Given('Fred searches for {string}', (product) => {
    this.product = product;
    homePage.searchAndSelect(product);
});
  
When('selects size {string}', (size) => {
    productPage.selectSize(size);
});

When('he adds the product to cart', () => {
    productPage.addToCart();
    productPage.viewCart();
    // pause();
});

Then('he is able to see the correct product in cart', () => {
    I.see(this.product, cartPage.locators.lineItemName);
});
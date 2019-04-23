const I = actor();

module.exports = {

  locators: {
    selectSize: '.select-size',
    addToCartButton: '.add-to-cart',
    miniCartIcon: {css: '.minicart'},
    cartHeader: '.cart-header'
  },

  selectSize(size) {
    // if (this.helpers['Puppeteer']) {
    //   const page =  this.helpers['Puppeteer'].page;
    //   await page.waitForSelector(this.locators.selectSize);
    // }
    I.waitForElement(this.locators.selectSize);
    I.selectOption(this.locators.selectSize, size);
  },

  addToCart() {
    I.waitForEnabled(this.locators.addToCartButton);
    I.click(this.locators.addToCartButton);
  },

  viewCart() {
    I.wait(3);
    I.scrollPageToTop();
    I.waitForEnabled(this.locators.miniCartIcon);
    I.waitForElement(this.locators.miniCartIcon);
    I.click(this.locators.miniCartIcon);
    I.waitForElement(this.locators.cartHeader);
  }
}

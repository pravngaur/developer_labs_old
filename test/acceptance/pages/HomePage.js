const I = actor();

module.exports = {

  locators: {
    root: '.modal-content',
    searchField: {css: '.search-field'},
    headerText: '.header-promotion',
    searchedImage: {css: 'a>img.swatch-circle'}
  },

  accept() {
    I.waitForElement(this.locators.root);
    within(this.locators.root, function() {
      I.click('Yes');
    });
  },

  searchAndSelect(product) {
    I.fillField(this.locators.searchField, product);
    I.waitForElement(this.locators.searchedImage);
    I.click(this.locators.searchedImage);
  }
};

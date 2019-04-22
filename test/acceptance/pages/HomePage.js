const I = actor();

module.exports = {

  locators: {
    root: '.modal-content',
    searchField: {css: '.search-field'},
    headerText: ".header-promotion"
  },

  accept() {
    I.waitForElement(this.locators.root);
    within(this.locators.root, function() {
      I.click('Yes');
    });
  },

  async search(searchFor) {
   I.fillField(this.locators.searchField, searchFor)
   const headerText = await I.grabTextFrom(this.locators.headerText);
   console.log('header text: ', headerText);
  }
};

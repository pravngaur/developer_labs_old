const I = actor();

module.exports = {

  locators: {
    root: '.modal-content',
    searchField: {css: '.search-field'}
  },

  accept() {
    I.waitForElement(this.locators.root);
    within(this.locators.root, function() {
      I.click('Yes');
    });
  },

  async search(searchFor) {
   I.fillField(this.locators.searchField, searchFor)
   const searchText = await I.grabTextFrom(this.locators.searchField);
   console.log('search text: =========== ', searchText);
  }
};

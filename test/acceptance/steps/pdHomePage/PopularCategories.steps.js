const { I, data, pdHomePage } = inject();

When('shopper selects yes or no for tracking consent in PD', () => {
    I.amOnPage(data.pdPopularCat.pdHomePage);
    pdHomePage.accept();
});

Then('shopper should see popular categories layout', () => {
   I.waitForElement('.popular-categories');
   I.seeElement('.popular-categories');
   I.seeNumberOfElements('.popular-category' ,data.pdPopularCat.expectedNumberOfCats);


  // From "test/acceptance/features/pdHomePage/pdPopularCategories.feature" {"line":7,"column":9}
  //throw new Error('Not implemented yet');
});

Then('shopper can click on a popular category', () => {
    pdHomePage.clickPopulareCategory(data.pdPopularCat.index, '/on/demandware.store/Sites-RefArch-Site/en_US/Search-Show?cgid=newarrivals-womens');
  // From "test/acceptance/features/pdHomePage/pdPopularCategories.feature" {"line":8,"column":9}
  //throw new Error('Not implemented yet');
});

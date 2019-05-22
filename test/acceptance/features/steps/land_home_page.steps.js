const { I, homePage } = inject();

When('shopper selects yes or no for tracking consent', () => {
    I.amOnPage('/on/demandware.store/Sites-RefArch-Site/en_US/Home-Show');
    homePage.accept();
});

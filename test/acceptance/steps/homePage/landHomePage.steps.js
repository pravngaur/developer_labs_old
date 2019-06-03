const { I, homePage } = inject();

When('shopper selects yes or no for tracking consent', () => {
    I.amOnPage('/s/RefArch/home?lang=en_US');
    homePage.accept();
});
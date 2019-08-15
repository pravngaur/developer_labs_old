const { I, data, homePage, pdHomePage } = inject();

When('shopper goes to the page designer homepage', () => {
    I.amOnPage('/s/RefArch/homepage-example.html?lang=default');
    homePage.accept();
});

When('Shopper sees the main banner carousel', () => {
    pdHomePage.seeCarousel();
});

Given('shopper sees carousel controls', () => {
    pdHomePage.controlsVisible();
});

When('shopper clicks next', () => {
    I.click(pdHomePage.locators.carouselNext);
    I.wait(1);
});

Then('Shopper should see next product', () => {
    pdHomePage.verifyNextProduct();
});

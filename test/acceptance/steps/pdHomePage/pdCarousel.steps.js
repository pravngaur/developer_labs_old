const { I, homePage, pdHomePage } = inject();

When('Shopper goes to the page designer homepage', () => {
    I.amOnPage('/s/RefArch/homepage-example.html?lang=default');
    homePage.accept();
});

When('Shopper sees the main banner carousel', () => {
    pdHomePage.seeCarousel(1);
});

Given('Shopper sees carousel controls', () => {
    pdHomePage.controlsVisible(1);
});

When('Shopper clicks next', () => {
    I.click(pdHomePage.locators.carouselNext);
    I.wait(1);
});

Then('Shopper should see next slide', () => {
    pdHomePage.verifyNextSlide(1);
});

When('Shopper clicks previous', () => {
    I.click(pdHomePage.locators.carouselPrevious);
    I.wait(1);
});

Then('Shopper should see previous slide', () => {
    pdHomePage.verifyPreviousSlide(1);
});

When('Shopper goes to the page designer homepage carousel-2', () => {
    I.amOnPage('/s/RefArch/homepage-example.html?lang=default');
    homePage.accept();
});

When('Shopper sees the main banner carousel-2', () => {
    pdHomePage.seeCarousel2(2);
});

Given('Shopper sees carousel-2 controls', () => {
    pdHomePage.controlsVisible2(2);
});

When('Shopper clicks next on carousel-2', () => {
    for (var i = 0; i < 5; i++) {
        I.click('.carousel:nth-child(2) .carousel-control-next');
        I.wait(1);
    }
});

Then('Shopper should see next product on carousel-2', () => {
    pdHomePage.verifyNextSlide2(2);
});

When('Shopper clicks previous on carousel-2', () => {
    I.click('.carousel:nth-child(2) .carousel-control-prev');
    I.wait(1);
});

Then('Shopper should see previous slide on carousel-2', () => {
    pdHomePage.verifyPreviousSlide2(1);
});

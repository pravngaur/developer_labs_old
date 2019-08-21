const { pageDesigner } = inject();

When('Shopper sees the main banner carousel', () => {
    pageDesigner.seeCarousel(1);
});

Given('Shopper sees carousel controls', () => {
    pageDesigner.controlsVisible(1);
});

When('Shopper clicks next', () => {
    pageDesigner.carouselControlClick(1, pageDesigner.locators.carouselNext);
});

Then('Shopper should see next slide', () => {
    pageDesigner.verifySlide(1, 'Summer Sales', pageDesigner.locators.mainBannerHeading);
});

When('Shopper clicks previous', () => {
    pageDesigner.carouselControlClick(1, pageDesigner.locators.carouselPrevious);
});

Then('Shopper should see previous slide', () => {
    pageDesigner.verifySlide(1, 'Dresses\nfor\nBesties', pageDesigner.locators.mainBannerHeading);
});

When('Shopper sees the main banner carousel-2', () => {
    pageDesigner.seeCarousel(2);
});

Given('Shopper sees carousel-2 controls', () => {
    pageDesigner.controlsVisible(2);
});

When('Shopper clicks next on carousel-2', () => {
    for (var i = 0; i < 5; i++) {
        pageDesigner.carouselControlClick(2, pageDesigner.locators.carouselNext);
    }
});

Then('Shopper should see next product on carousel-2', () => {
    pageDesigner.verifySlide(2, 'Floral Print Pencil Skirt.', '.product-name-link');
});

When('Shopper clicks previous on carousel-2', () => {
    pageDesigner.carouselControlClick(2, pageDesigner.locators.carouselPrevious);
});

Then('Shopper should see previous slide on carousel-2', () => {
    pageDesigner.verifySlide(2, 'Incase', '.product-name-link');
});

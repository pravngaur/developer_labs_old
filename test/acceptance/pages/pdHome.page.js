const I = actor();

module.exports = {
    locators: {
        carousel: '.experience-commerce_layouts-carousel .carousel',
        carouselNext: '.carousel-control-next',
        carouselPrevious: '.carousel-control-prev',
        carouselInner: '.carousel-inner.row'
    },
    seeCarousel(position) {
        let carousel = locate(this.locators.carousel).at(position);
        I.seeElement(carousel);
    },

    seeCarousel2(position) {
        let carousel = locate(this.locators.carousel).at(position);
        I.seeElement('.carousel:nth-child(2)', carousel);
    },

    controlsVisible(position) {
        let carousel = locate(this.locators.carousel).at(position);
        I.seeElement(this.locators.carouselNext, carousel);
        I.seeElement(this.locators.carouselPrevious, carousel);
    },

    controlsVisible2() {
        I.seeElement('.carousel:nth-child(2) .carousel-control-next');
        I.seeElement('.carousel:nth-child(2) .carousel-control-prev');
    },

    verifyNextSlide(position) {
        let carousel = locate(this.locators.carousel).at(position);
        let activeSlide = carousel.find('.carousel-item.active .image-heading-text');

        I.seeTextEquals('Summer Sales', activeSlide);
    },

    verifyNextSlide2() {
        I.seeTextEquals('Floral Print Pencil Skirt.', '.carousel:nth-child(2) .carousel-item.active .product-name-link');
    },

    verifyPreviousSlide(position) {
        let carousel = locate(this.locators.carousel).at(position);
        let activeSlide = carousel.find('.carousel-item.active .image-heading-text');

        I.seeTextEquals('Dresses\nfor\nBesties', activeSlide);
    },

    verifyPreviousSlide2() {
        I.seeTextEquals('Incase', '.carousel:nth-child(2) .carousel-item.active .product-name-link');
    }
};

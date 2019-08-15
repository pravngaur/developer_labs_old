const I = actor();

module.exports = {
    locators: {
        carousel: '.experience-commerce_layouts-carousel .carousel',
        carouselNext: '.carousel-control-next',
        carouselPrevious: '.carousel-control-prev',
        carouselInner: '.carousel-inner.row'
    },
    seeCarousel() {
        let carousel = locate(this.locators.carousel).first();
        I.seeElement(carousel);
    },
    controlsVisible() {
        let carousel = locate(this.locators.carousel).first();
        I.seeElement(this.locators.carouselNext, carousel);
        I.seeElement(this.locators.carouselPrevious, carousel);
    },
    verifyNextProduct() {
        let carousel = locate(this.locators.carousel).first();
        let activeSlide = carousel.find('.carousel-item.active .image-heading-text');

        I.seeTextEquals('Summer Sales', activeSlide);
    }

};
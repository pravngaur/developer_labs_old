const I = actor();

module.exports = {
    locators: {
        button: 'button',
        selectSize: '.select-size',
        selectQuantity: '.quantity-select',
        addToCartButton: '.add-to-cart',
        addToCartButtonEnabled: '.add-to-cart:not(:disabled)',
        miniCartIcon: '.minicart',
        cartHeader: '.cart-header',
        productImage: '.carousel-item.active > img',
        navigationCrumbs: '.product-breadcrumb:not(.d-md-none) .breadcrumb-item a',
        productName: '.product-name',
        productId: '.product-id',
        ratings: '.ratings',
        quantitySelect: '.quantity-select',
        productAvailability: '.availability-msg',
        productPrice: '.prices .price .value',
        socialShare: 'ul.social-icons a',
        pinterest: '.fa-pinterest',
        facebook: '.fa-facebook-official',
        twitter: '.fa-twitter',
        copyLink: '.fa-link',
        productDescription: '.description-and-detail .description .content',
        productDetails: '.description-and-detail .details .content',
        copyLinkMsgVisible: '.copy-link-message:not(.d-none)',
        miniCartQuantity: '.minicart-quantity',
        addToCartSuccess: '.add-to-cart-messages .alert-success',
        addToCartFailure: '.add-to-cart-messages .alert-danger',
        filterColor: '.swatch-circle-',
        qv_ProductBtn: '.quickview.hidden-sm-down',
        qv_ColorBtn: '.color-attribute',
        qv_SizeSelect: '.custom-select.form-control.select-size',
        qv_AddToCart: '.add-to-cart-global.btn.btn-primary'
    },
    selectSize(size) {
        I.waitForElement(this.locators.selectSize);
        I.selectOption(this.locators.selectSize, size);
    },
    selectQuantity(quantity) {
        I.wait(2);
        I.waitForElement(this.locators.selectQuantity);
        I.selectOption(this.locators.selectQuantity, quantity);
    },
    addToCart() {
        I.scrollTo(this.locators.addToCartButton);
        I.waitForEnabled(this.locators.addToCartButton);
        I.click(this.locators.addToCartButton);
    },
    viewCart() {
        I.scrollPageToTop();
        I.wait(2);
        I.click(this.locators.miniCartIcon);
        I.waitForElement(this.locators.cartHeader);
    },
    clickCopyLink() {
        I.waitForEnabled(this.locators.copyLink);
        I.click(this.locators.copyLink);
    },
    filterProductColor(color) {
        I.waitForElement(this.locators.filterColor + color);
        I.click(this.locators.filterColor + color);
    },
    filterProductSize(filterSizeLink) {
        let locator = locate(this.locators.button)
            .withAttr({'data-href': filterSizeLink});
        I.scrollTo(locator);
        I.waitForElement(locator);
        I.click(locator);
    },
    filterProductPrice(filterPriceLink) {
        let locator = locate(this.locators.button)
            .withAttr({'data-href': filterPriceLink});
        I.scrollTo(locator);
        I.waitForElement(locator);
        I.click(locator);
    },
    openProductQuickView(pdpQuickViewLink) {
        let locator = locate('.quickview.hidden-sm-down')
            .withAttr({href: '/on/demandware.store/Sites-RefArch-Site/en_US/Product-ShowQuickView?pid=25697194M'});
        //I.wait(50);
        I.waitForElement(locator);
        I.scrollTo(locator);
        I.click(locator);
    },
    selectQuickViewColor(color) {
        let locator = locate(this.locators.qv_ColorBtn)
            .withAttr({'aria-label': 'Select Color ' + color})
        I.waitForElement(locator);
        I.click(locator);
    },
    selectQuickViewSize(size) {
        I.waitForElement(this.locators.qv_SizeSelect);
        I.selectOption(this.locators.qv_SizeSelect, size);
    },
    addToCartQuickView() {
        I.waitForElement(this.locators.qv_AddToCart);
        I.click(this.locators.qv_AddToCart);
    }
};

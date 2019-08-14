const I = actor();

module.exports = {
    locators: {
        consentTrackModal: '.modal-content',
        consentTrackAffirm: '.affirm',
        searchField: 'input.form-control.search-field',
        searchedImage: 'a>img.swatch-circle',
        loginButton: '.user-message',
        subscribeEmail: 'input.form-control',
        subscribeButton: '.subscribe-email',
        emailSignup: '.email-signup-alert',
        qv_ProductBtn: '.quickview.hidden-sm-down',
        qv_ColorBtn: '.color-attribute',
        qv_SizeSelect: '.custom-select.form-control.select-size',
        qv_AddToCart: '.add-to-cart-global.btn.btn-primary'
    },
    accept() {
        I.waitForElement(this.locators.consentTrackModal);
        within(this.locators.consentTrackModal, () => {
            I.click(this.locators.consentTrackAffirm);
        });
    },
    search(product) {
        I.fillField(this.locators.searchField, product);
        I.waitForElement(this.locators.searchedImage);
        I.click(this.locators.searchedImage);
    },
    clickLogin() {
        I.waitForElement(this.locators.loginButton);
        I.click(this.locators.loginButton);
    },
    subscribeList(email) {
        I.fillField('hpEmailSignUp', email);
    },
    openProductQuickView(name) {
        let locator = locate(this.locators.qv_ProductBtn)
            .withAttr({href: '/on/demandware.store/Sites-RefArch-Site/en_US/Product-ShowQuickView?pid=25519318M'})
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
    addToCartQV(product) {
        I.waitForElement(this.locators.qv_AddToCart);
        I.click(this.locators.qv_AddToCart);
        I.scrollPageToTop();
    }
};

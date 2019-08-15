const I = actor();

module.exports = {
    locators: {
        consentTrackModal: '.modal-content',
        consentTrackAffirm: '.affirm.btn.btn-primary',
        searchField: 'input.form-control.search-field',
        searchedImage: 'a>img.swatch-circle',
        loginButton: '.user-message',
        subscribeEmail: 'input.form-control',
        subscribeButton: '.subscribe-email',
        emailSignup: '.email-signup-alert',
        searchWomens: '#womens.nav-link.dropdown-toggle',
        searchWomensClothing: '#womens-clothing.dropdown-link.dropdown-toggle',
        searchWomensTops: '#womens-clothing-tops.dropdown-link',
        searchStoreZipCode: '#store-postal-code',
        searchStoreBtn: '.btn-storelocator-search',
        searchStoreResults: '.results.striped',
        searchStoreCard: '.card-body',
        searchStoreRadius: '.form-control.custom-select.radius'
    },
    accept() {
        I.waitForElement(this.locators.consentTrackModal);
        within(this.locators.consentTrackModal, () => {
            I.click(this.locators.consentTrackAffirm);
        });
    },
    search(product) {
        I.waitForElement(this.locators.searchField, 2);
        I.fillField(this.locators.searchField, product);
        I.waitForElement(this.locators.searchedImage);
        I.click(this.locators.searchedImage);
    },
    subscribeList(email) {
        I.fillField('hpEmailSignUp', email);
    },
    searchMenu(productPage) {
        I.amOnPage(productPage);
    },
    searchForStore(zip) {
        I.waitForElement(this.locators.searchStoreZipCode);
        I.fillField(this.locators.searchStoreZipCode, zip);
        I.click(this.locators.searchStoreBtn);
    },
    verifyStoreResults(numStores) {
        I.wait(1);
        I.waitForElement(this.locators.searchStoreResults);
        let locator = locate(this.locators.searchStoreCard)
            .inside(this.locators.searchStoreResults);
        I.seeNumberOfVisibleElements(locator, numStores);
    },
    changeStoreRadius(radius) {
        I.waitForElement(this.locators.searchStoreRadius);
        I.selectOption(this.locators.searchStoreRadius, radius);
    }
};

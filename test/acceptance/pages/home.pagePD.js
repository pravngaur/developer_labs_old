const I = actor();

module.exports = {
    locators: {
        consentTrackModal: '#consent-tracking .modal-content',
        consentTrackAffirm: '.affirm'
    },
    accept() {
        I.waitForElement(this.locators.consentTrackModal);
        within(this.locators.consentTrackModal, () => {
            // I.wait(500);
            I.click(this.locators.consentTrackAffirm);
        });
    },
    clickPopulareCategory(index, url) {
        let locator = locate('.popular-category')
            .at(index);

        I.seeElement(locator);
        I.click(locator);
        I.seeInCurrentUrl(url);
    }
};

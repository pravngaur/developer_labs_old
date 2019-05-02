const I = actor();

module.exports = {
    locators: {
        consentTrackModal: '.modal-content',
        consentTrackAffirm: '.affirm'
    },
    accept() {
        I.waitForElement(this.locators.consentTrackModal);
        within(this.locators.consentTrackModal, () => {
            I.click(this.locators.consentTrackAffirm);
        });
    }
}
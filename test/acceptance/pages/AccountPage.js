const I = actor();

module.exports = {
    locators: {
        addressTitle: '#addressId.form-control',
        fName: '#firstName.form-control',
        lName: '#lastName.form-control',
        address1: '#address1.form-control',
        address2: '#address2.form-control',
        country: '#country.form-control',
        state: '#state.form-control',
        city: '#city.form-control',
        zip: '#zipCode.form-control',
        phone: '#phone.form-control',
        saveBtn: '.btn.btn-save.btn-block.btn-primary'
    },
    addAddress(addressTitle, fName, lName, address1, address2, country, state, city, zipcode, phone) {
        I.fillField(this.locators.addressTitle, addressTitle);
        I.fillField(this.locators.fName, fName);
        I.fillField(this.locators.lName, lName);
        I.fillField(this.locators.address1, address1)
        I.fillField(this.locators.address2, address2)
        I.waitForElement(this.locators.country);
        I.selectOption(this.locators.country, country);
        I.waitForElement(this.locators.state);
        I.selectOption(this.locators.state, state);
        I.fillField(this.locators.city, city);
        I.fillField(this.locators.zip, zipcode);
        I.fillField(this.locators.phone, phone);
        I.click(this.locators.saveBtn);
    },
    fillPaymentInfo(email, phone, ccNum, expMonth, expYear, ccSecCode) {
        I.fillField(this.locators.payEmail, email);
        I.fillField(this.locators.payPhone, phone);
        I.fillField(this.locators.payCard, ccNum);
        I.waitForElement(this.locators.payExpMonth, expMonth);
        I.selectOption(this.locators.payExpMonth, expMonth);
        I.waitForElement(this.locators.payExpYear, expYear);
        I.selectOption(this.locators.payExpYear, expYear);
        I.fillField(this.locators.paySecCode, ccSecCode);
    }
};

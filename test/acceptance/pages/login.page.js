const I = actor();

module.exports = {
    locators: {
        loginHomeScreen: 'span.user-message',
        emailLogin: '#login-form-email',
        passwordLogin: '#login-form-password',
        primaryButton: '.btn.btn-block.btn-primary',
        rememberMe: '.remember-me',
        createAccount: '#register-tab',
        firstName: '#registration-form-fname',
        lastName: '#registration-form-lname',
        phoneNum: '#registration-form-phone',
        emailAdr: '#registration-form-email',
        emailAdrConfirm: '#registration-form-email-confirm',
        password: '#registration-form-password',
        passwordConfirm: '#registration-form-password-confirm',
        orderNumber: "#trackorder-form-number",
        orderEmail: "#trackorder-form-email",
        orderZipCode: "#trackorder-form-zip",
        checkOrderError: ".alert.alert-danger"
    },
    fillLoginForm(email, password) {
        I.fillField(this.locators.emailLogin, email);
        I.fillField(this.locators.passwordLogin, password);
    },
    createAccount(fName, lName, phone, email, password) {
        I.fillField(this.locators.firstName, fName);
        I.fillField(this.locators.lastName, lName);
        I.fillField(this.locators.phoneNum, phone);
        I.fillField(this.locators.emailAdr, email);
        I.fillField(this.locators.emailAdrConfirm, email);
        I.fillField(this.locators.password, password);
        I.fillField(this.locators.passwordConfirm, password);
    },
    checkOrder(orderNum, orderEmail, billingZip) {
        I.fillField(this.locators.orderNumber, orderNum);
        I.fillField(this.locators.orderEmail, orderEmail);
        I.fillField(this.locators.orderZipCode, billingZip);
    },
    clickOAuth() {
        // click login with google
        // click backspace
        // click login with facebook
    }
};
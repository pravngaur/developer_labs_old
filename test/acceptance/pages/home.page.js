const I = actor();
const config = require('../../../codecept.conf').config;

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
        searchWomens: '#womens.nav-link.dropdown-toggle',
        searchWomensClothing: '#womens-clothing.dropdown-link.dropdown-toggle',
        searchWomensTops: '#womens-clothing-tops.dropdown-link'
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
    clickLogin() {
        let desktopLocator = locate(this.locators.loginButton)
            .withText('Login');
        let tabletLocator = locate('.fa.fa-sign-in')
            .withAttr({'aria-hidden': 'true'});
        let mobileLocator = locate('.navbar-toggler.d-md-none')
            .withAttr({'aria-label': 'Toggle navigation'});
        let failedTest = 'this class should never be found';

        if(I.isExisting(failedTest).then((res) => {console.log('first res: ', res)})) {
            console.log('WOOOOOP');
        }
        if(I.isExisting(desktopLocator).then((res) => {console.log('second res: ', res)})) {
            I.click(desktopLocator);
        }
        // I.isExisting('.loginClass-Mobile')
        //     .then((res) => {
        //         console.log('loginClass-Mobile: ', res);
        //         if (res.length !== 0) {
        //             console.log("Clicking mobile");
        //             I.click('.loginClass-Mobile');
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });


        // .then((res) => {
        //     console.log("res 1: ", res);
        //     if (res === true) {
        //         console.log("Clicking desktop");
        //         I.click(desktopLocator);
        //     }   
        // }).catch((err) => {
        //     console.log(err);
        // });

        // I.isExisting(tabletLocator)
        // .then((res) => {
        //     console.log("res 2: ", res);
        //     if (res === true) {
        //         console.log("Clicking tablet");
        //         I.click(tabletLocator);
        //     }   
        // }).catch((err) => {
        //     console.log(err);
        // });
        
        // let foo = I.isExisting(mobileLocator)
        //     .then((res) => {
        //         if (res.length !== 0) {
        //             return true;
        //         } else {
        //             return false;
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
        // console.log('AHDIWHJWDUHWDUHWDWUDHWUDKWH: ', foo);
        // if(foo === true) {
        //     I.click(mobileLocator);
        // }
        // I.wait(2);
        // console.log('foo: ', foo, ' bar: ', bar);
        // if(foo === true) {
        //     I.click(desktopLocator);
        // } else {
        //     I.click(tabletLocator);
        // }
        // console.log('Test True: ', I.isExisting(desktopLocator));
        // console.log('Test False: ', I.isExisting('wowowwowowoowwowoww'));
        // console.log('WEEWOOWEEEWOOo: ', I.isExisting(desktopLocator));
        // if(I.isExisting(tabletLocator)) {
        //     console.log('DESKTOP/TABLET');
        //     I.click(tabletLocator);
        // // } else if(I.isExisting(tabletLocator)) {
        // //     console.log('TABLET');
        // //     I.click(tabletLocator);
        // } else {
        //     console.log('MOBILE');
        //     I.click(mobileLocator);
        // }
        // console.log(I.click(this.locators.loginButton));
        // I.click(this.locators.loginButton);
    },
    subscribeList(email) {
        I.fillField('hpEmailSignUp', email);
    },
    // Method is hardcoded to search for Women's tops from the menu
    searchMenu() {
        I.waitForElement(this.locators.searchWomens);
        I.moveCursorTo(this.locators.searchWomens);
        I.waitForElement(this.locators.searchWomensClothing);
        I.moveCursorTo(this.locators.searchWomensClothing);
        I.waitForElement(this.locators.searchWomensTops);
        I.click(this.locators.searchWomensTops);
    }
};

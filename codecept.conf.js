var RELATIVE_PATH = './test/acceptance';
var OUTPUT_PATH = RELATIVE_PATH + '/report';
var HOST = 'https://dev12-sitegenesis-dw.demandware.net';

const metadata = require('./test/acceptance/metadata.json');

var webDriver = {
    url: HOST,
    browser: 'chrome',
    smartWait: 10000,
    waitForTimeout: 10000,
    timeouts: {
        script: 60000,
        'page load': 10000
    }//,
    // desiredCapabilities: {
    //     chromeOptions: {
    //         args: ["--headless", "--disable-gpu", "--window-size=800,600"]
    //     }
    // }
};

exports.config = {
    output: OUTPUT_PATH,
    helpers: {
        WebDriver: webDriver
    },
    plugins: {
        wdio: {
            enabled: true,
            services: ['selenium-standalone']
        },
        allure: {
            enabled: true
        },
        retryFailedStep: {
            enabled: true,
            retries: 5
        }
    },
    include: {
        I: './steps_file.js',
        data: RELATIVE_PATH + '/metadata.json',
        homePage: RELATIVE_PATH + '/pages/HomePage.js',
        productPage: RELATIVE_PATH + '/pages/ProductPage.js',
        cartPage: RELATIVE_PATH + '/pages/CartPage.js',
        loginPage: RELATIVE_PATH + '/pages/LoginPage.js'
    },
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: [
            RELATIVE_PATH + '/steps/step_file.steps.js',
            RELATIVE_PATH + '/steps/homePage/addProductToCart.steps.js',
            RELATIVE_PATH + '/steps/homePage/emailSignup.steps.js',
            RELATIVE_PATH + '/steps/homePage/landHomePage.steps.js',
            RELATIVE_PATH + '/steps/loginPage/checkOrder.steps.js',
            RELATIVE_PATH + '/steps/loginPage/createAccount.steps.js',
            RELATIVE_PATH + '/steps/loginPage/loginUser.steps.js',
            RELATIVE_PATH + '/steps/productDetailPage/pdpSimpleLayout.steps.js',
        ]
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

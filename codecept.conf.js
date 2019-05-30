var RELATIVE_PATH = './test/acceptance';
var OUTPUT_PATH = RELATIVE_PATH + '/report';
var HOST = 'https://dev03-sitegenesis-dw.demandware.net';

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
            RELATIVE_PATH + '/features/steps/TEMPSTORAGE.steps.js',
            RELATIVE_PATH + '/features/steps/land_home_page.steps.js',
            RELATIVE_PATH + '/features/steps/add_product_to_cart.steps.js',
            RELATIVE_PATH + '/features/steps/simple_product_details.steps.js',
            RELATIVE_PATH + '/features/steps/login.steps.js',
            RELATIVE_PATH + '/features/steps/create_account.steps.js',
            RELATIVE_PATH + '/features/steps/check_order.steps.js',
            RELATIVE_PATH + '/features/steps/email_signup.steps.js'
        ]
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const HOST = 'https://dev03-sitegenesis-dw.demandware.net';

const webDriver = {
    url: HOST,
    browser: 'chrome',
    waitForTimeout: 10000,
    timeouts: {
        script: 60000,
        'page load': 10000
    }
};

exports.config = {
    output: OUTPUT_PATH,
    smartWait: 10000,
    helpers: {
        WebDriver: webDriver
    },
    plugins: {
        wdio: {
            enabled: true,
            services: ['selenium-standalone']
        },
        allure: {
            outPutDir: RELATIVE_PATH + '/report'
        },
        retryFailedStep: {
            enabled: true,
            retries: 5
        }
    },
    include: {
        I: './steps_file.js',
        homePage: RELATIVE_PATH + '/pages/HomePage.js',
        productPage: RELATIVE_PATH + '/pages/ProductPage.js',
        cartPage: RELATIVE_PATH + '/pages/CartPage.js'
    },
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: [
            RELATIVE_PATH + '/features/steps/land_home_page.steps.js',
            RELATIVE_PATH + '/features/steps/add_product_to_cart.steps.js'
        ]
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
}
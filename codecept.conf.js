const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const HOST = 'https://dev11-sitegenesis-dw.demandware.net';

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
        }
    },
    include: {
        I: RELATIVE_PATH + '/steps',
        homePage: RELATIVE_PATH + '/pages/HomePage.js'
    },
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: [
            RELATIVE_PATH + '/features/_step_definitions/add_to_cart.steps.js'
        ]
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
}
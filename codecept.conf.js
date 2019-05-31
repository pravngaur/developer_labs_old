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
    include: metadata.include,
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: metadata.gherkin_steps
    },
    // multiple: {
    //     basic: {
    //         browsers: [
    //             // {browser: 'chrome', windowSize: 'maximize'},
    //             // {browser: 'chrome', windowSize: '1220x1000'},
    //             // {browser: 'chrome', windowSize: '1024x1000'},
    //             // {browser: 'chrome', windowSize: '768x1000'},
    //             // {browser: 'chrome', windowSize: '320x1000'},
    //             {browser: 'safari', windowSize: '1220x1000'},
    //             {browser: 'safari', windowSize: '1024x1000'},
    //             {browser: 'safari', windowSize: '768x1000'},
    //             {browser: 'safari', windowSize: '320x1000'}
    //         ]
    //     }
    // },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

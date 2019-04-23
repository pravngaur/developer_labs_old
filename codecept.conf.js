/* eslint-disable comma-dangle */
/* eslint-disable indent */

require('import-export');
require('events').EventEmitter.prototype._maxListeners = 100;
var debug = require('debug')('acceptance:config');
const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const HOST = 'https://ecom-2015234003.vpod.t.force.com/';

const puppeteer = {
    url: HOST,
    waitForTimeout: 10000,
    waitForAction: 200,
    chrome: {
        ignoreHTTPSErrors: true
    },
    show: false,
    waitForNavigation: 'domcontentloaded'
};

const webDriver = {
    url: HOST,
    browser: 'chrome',
    waitForTimeout: 10000,
    timeouts: {
        script: 60000,
        'page load': 10000
    }
};

const headlessCaps = {
    chromeOptions: {
        args: [ '--headless', '--disable-gpu', '--window-size=800,600' ]
    }
};

const sauceDriver = {
    url: HOST,
    browser: "chrome",
    host: "ondemand.saucelabs.com",
    port: 443,
    user: "jsautomation",
    key: "eb4958c7-b945-4ccd-a1d3-0ba226f7f8ff"
}

const conf = {
    output: OUTPUT_PATH,
    smartWait: 10000,
    cleanup: true,
    helpers: {
        REST: {
            endpoint: 'https://jsonplaceholder.typicode.com'
         },
         SauceLabsHelper: {
            require: RELATIVE_PATH + '/helpers/saucelabsHelper.js'
         },
    },
    plugins: {
        autoDelay: {
            enabled: true
        },
        screenshotOnFail: {
            enabled: true
        },
        wdio: {
            services: ['sauce'],
            user: 'jsautomation' ,
            key: 'eb4958c7-b945-4ccd-a1d3-0ba226f7f8ff'
        },
        allure: {
            outputDir: RELATIVE_PATH + '/report'
        }
    },
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: [
            RELATIVE_PATH + '/features/_step_definitions/add_to_cart.steps.js',
            RELATIVE_PATH + '/features/_step_definitions/hooks.js'
        ]
    },
    multiple: {
        parallel: {
          chunks: 2,
          browsers: ['firefox', 'chrome']
        },
        basic: {
            browsers: ['firefox', 'chrome']
        },
        smoke: {
            grep: '@smoke',
            outputName: RELATIVE_PATH + '/report/smoke',
            browsers: ['firefox', 'chrome']
        }
    },
    include: {
        I: '.test/acceptance/steps',
        loginPage: RELATIVE_PATH + '/pages/LoginPage.js',
        homePage: RELATIVE_PATH + '/pages/HomePage.js',
        productPage: RELATIVE_PATH + '/pages/ProductPage.js',
        cartPage: './test/acceptance/pages/CartPage.js',
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

if ( process.env.CODECEPT_ENV && process.env.CODECEPT_ENV === 'puppeteer') {
    debug('running tests on Puppeteer');
    conf.helpers.Puppeteer = puppeteer;
} else if ( process.env.CODECEPT_ENV && process.env.CODECEPT_ENV === 'sauce') {   
    debug('running tests on Sauce Labs');
    conf.helpers.WebDriver = sauceDriver;
} else if ( process.env.CODECEPT_ENV && process.env.CODECEPT_ENV === 'headless') {    
    debug('running tests Headlessly');
    conf.helpers.WebDriver = webDriver;    
    conf.helpers.WebDriver.desiredCapabilities = headlessCaps;
} else {
    conf.helpers.WebDriver = webDriver;
    debug('launching browser locally:', conf.helpers.WebDriver.browser);
}

exports.config = conf;













































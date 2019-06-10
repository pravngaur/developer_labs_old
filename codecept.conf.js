let debug = require('debug')('acceptance:config');
let merge = require('deepmerge');
let sauce = require('./codecept.sauce.conf');

const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const DEFAULT_HOST = 'https://dev11-sitegenesis-dw.demandware.net';

const HOST = process.host || DEFAULT_HOST;
    /*
    process: {
        host
        profile
    }
    */
const metadata = require('./test/acceptance/metadata.json');

var webDriver = {
    url: HOST,
    browser: process.profile || 'chrome',
    smartWait: 10000,
    waitForTimeout: 10000,
    coloredLogs: true,
    timeouts: {
        script: 60000,
        'page load': 10000
    },
    // host: 'ondemand.saucelabs.com',
    // user: 'sso-saleforce-c.thorsen',
    // key: '7f91c455-a16d-4174-9361-25688ea92e23'
};

const headlessCaps = {
    chromeOptions: {
        args: ['--headless', '--disable-gpu', '--window-size=1920,1080']
    }
};

let conf = {
    output: OUTPUT_PATH,
    cleanup: true,
    coloredLogs: true,
    helpers: {
        REST: {},
        WebDriver: webDriver
        // Appium: {
        //     host: 'us1.appium.testobject.com',
        //     port: 443,
        //     browser: 'Chrome',
        //     desiredCapabilities: [{
        //         platformName: 'Android',
        //         deviceName: 'Google Pixel',
        //         browserName: 'Chrome'
        //     }]
        // },
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
        },
        // autoDelay: {
        //     enabled: true
        // },
        // screenshotOnFail: {
        //     enabled: true
        // }
    },
    multiple: {
        parallel: {
            chunks: 2,
            browsers: ['chrome']
        },
        smoke: {
            grep: '@smoke',
            browsers: ['chrome']
        }
    },
    include: metadata.include,
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: metadata.gherkin_steps
    },
    tests: RELATIVE_PATH + '/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

if (process.profile) {
    //run on sauce labs
    // --profile=sauce:chrome --profile:sauce:firefox
    if(process.profile.match('sauce:[a-zA-Z]')) {
        debug('running tests on "Sauce" browser');
        conf = merge( conf, sauce.conf);
        debug('config: ', JSON.stringify(conf, 2));
    }

    // run on chrome headless browser
    // --profile=chrome:headless
    else if (process.profile === 'chrome:headless') {
        debug('running tests on "Headless" browser');
        process.profile = process.profile.split(':')[0];
        conf.helpers.WebDriver.browser = process.profile;
        conf.helpers.WebDriver.capabilities = headlessCaps;
    }
}

exports.config = conf;

    // {browser: 'safari', windowSize: '800x600'},
    // {browser: 'chrome', windowSize: '360x640'}, //galaxy
    // {browser: 'chrome', windowSize: '375x812'}, //iphone X
    // {browser: 'chrome', windowSize: '768x1024'}, //ipad
    // {browser: 'chrome', windowSize: '400x1219'}, //responsive
    // {browser: 'firefox', windowSize: '360x640'}, //galaxy
    // {browser: 'firefox', windowSize: '375x812'}, //iphone X
    // {browser: 'firefox', windowSize: '768x1024'}, //ipad
    // {browser: 'firefox', windowSize: '400x1219'}, //responsive
           
    //     SauceLabsTesting: {
    //         browsers: ['internet explorer', {
    //             browserName: 'internet explorer',
    //                 desiredCapabilities: {
    //                     platform: 'Windows 10',
    //                     version: '11.285',
    //                     recordVideo: false,
    //                     recordScreenshots: false
    //                 }
    //             }]
    //             // {
    //             // browserName: 'chrome',
    //             //     desiredCapabilities: {
    //             //         platform: 'Windows 10',
    //             //         version: '74.0',
    //             //         recordVideo: false,
    //             //         recordScreenshots: false,
    //             //         screenResolution: '360x640'
    //             //     }
    //             // }]
    //             // {
    //             //     browserName: 'chrome',
    //             //     platform: 'Windows 10',
    //             //     version: '74.0',
    //             //     recordVideo: false,
    //             //     recordScreenshots: false,
    //             //     screenResolution: '375x812'
    //             // },
    //             // {
    //             //     browserName: 'chrome',
    //             //     platform: 'Windows 10',
    //             //     version: '74.0',
    //             //     recordVideo: false,
    //             //     recordScreenshots: false,
    //             //     screenResolution: '768x1024'
    //             // },
    //             // {
    //             //     browserName: 'chrome',
    //             //     platform: 'Windows 10',
    //             //     version: '74.0',
    //             //     recordVideo: false,
    //             //     recordScreenshots: false,
    //             //     screenResolution: '400x1219'
    //             // }
    //     }
    // },

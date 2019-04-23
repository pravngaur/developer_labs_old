/* eslint-disable comma-dangle */
/* eslint-disable indent */
require('import-export');
require('events').EventEmitter.prototype._maxListeners = 100;
const fs = require('fs');
const selenium = require('selenium-standalone');
const reportFolder = process.cwd() + '/test/acceptance/report';
const OUTPUT_PATH = './test/acceptance/report';

exports.config = {
    output: OUTPUT_PATH,
    timeout: 30000,
    smartWait: 5000,
    cleanup: true,
    helpers: {
        // Puppeteer: {
        //     url: 'https://ecom-2015234003.vpod.t.force.com/',
        //     show: true,
        //     "waitForNavigation": "networkidle0"
        // },

        WebDriver: {
            url: 'https://ecom-2015234003.vpod.t.force.com/',
            browser: 'chrome',
            // desiredCapabilities: {
            //     chromeOptions: {
            //         args: [ '--headless', '--disable-gpu', '--window-size=800,600' ]
            //     }
            // }
        },
        REST: {
            endpoint: 'https://jsonplaceholder.typicode.com'
         }
    },
    gherkin: {
        features: './test/acceptance/features/**/*.feature',
        steps: ['./test/acceptance/features/_step_definitions/add_to_cart.steps.js', './test/acceptance/features/_step_definitions/before_after.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        wdio: {
            services: ['sauce'],
            user: 'jsautomation' ,
            key: 'eb4958c7-b945-4ccd-a1d3-0ba226f7f8ff'
        },
        allure: {
            outputDir: './test/acceptance/report'
        }
    },
    multiple: {
        parallel: {
          chunks: 4
        },
        sauce: {

        },
        basic: {
            browsers: ['firefox', 'chrome']
        },
        smoke: {
            grep: '@smoke',
            outputName: './test/acceptance/report/smoke',
            browsers: ['firefox', 'chrome']
        }
    },
    include: {
        I: '.test/acceptance/steps',
        loginPage: './test/acceptance/pages/LoginPage.js',
        homePage: './test/acceptance/pages/HomePage.js'
    },
    tests: './test/acceptance/tests/**/*.test.js',
    name: 'storefront-reference-architecture'
};

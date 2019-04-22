/* eslint-disable comma-dangle */
/* eslint-disable indent */
require('import-export');
require('events').EventEmitter.prototype._maxListeners = 100;
const selenium = require('selenium-standalone');

exports.config = {
    output: './test/acceptance/report',
    timeout: 10000,
    helpers: {
        WebDriver: {
            url: 'https://ecom-2015234003.vpod.t.force.com/',
            browser: 'chrome'
        }
    },
    gherkin: {
        features: './test/acceptance/features/*.feature',
        steps: ['./test/acceptance/steps/add_to_cart.steps.js', './test/acceptance/steps/before_after.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        wdio: {
            services: ['selenium-standalone']
        },
        allure: {
            outputDir: './test/acceptance/report'
        }
    },
    multiple: {
        parallel: {
          chunks: 2,
        },
        default: {
          grep: 'signin',
          browsers: [
            'chrome',
            'firefox'
          ],
        },
      },
    include: {
        I: '.test/acceptance/steps',
        loginPage: './test/acceptance/pages/LoginPage.js'
    },
    name: 'storefront-reference-architecture'
};

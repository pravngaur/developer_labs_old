let debug = require('debug')('acceptance:config');
let merge = require('deepmerge');
let codeceptjsShared = require('codeceptjs-shared');
let codeceptJsSauce = require('codeceptjs-saucelabs');

const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const DEFAULT_HOST = 'https://dev20-sitegenesis-dw.demandware.net';

const metadata = require('./test/acceptance/metadata.json');

const HOST = process.host || DEFAULT_HOST;

let conf = {
    output: OUTPUT_PATH,
    cleanup: true,
    coloredLogs: true,
    helpers: {
        REST: {},
        WebDriver: {
            url: HOST,
            waitForTimeout: 5000
        },
    },
    plugins: {
        wdio: {
            enabled: true,
            services: ['selenium-standalone']
        },
        autoLogin: {
            enabled: true,
            inject: 'login',
            users: {
                user: {
                    login: (I) => {
                        console.log('YOU ARE IN THE LOGIN FUNCTION IN CODECEPTJS');
                        I.amOnPage(metadata.login.homePage);
                        // Click yes for tracking consent
                        I.waitForElement('.modal-content');
                        within('.modal-content', () => {
                            I.click('.affirm');
                        });
                        // Click login
                        I.waitForElement('.user-message');
                        I.click('.user-message')
                        I.fillField('#login-form-email', metadata.login.email);
                        I.fillField('#login-form-password', metadata.login.password);

                        I.waitForElement('.btn.btn-block.btn-primary');
                        I.click('.btn.btn-block.btn-primary');
                        I.seeInCurrentUrl(metadata.login.currentUrl);
                    },
                    check: (I) => {
                        I.amOnPage(metadata.login.currentUrl);
                    }
                }
            }
        }
    },
    include: metadata.include,
    gherkin: {
        features: RELATIVE_PATH + '/features/**/*.feature',
        steps: metadata.gherkin_steps
    },
    name: 'storefront-reference-architecture'
};

console.log(merge(merge(conf, codeceptjsShared.conf), codeceptJsSauce.conf));
exports.config = merge(merge(conf, codeceptjsShared.conf), codeceptJsSauce.conf);

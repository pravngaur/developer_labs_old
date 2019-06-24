let debug = require('debug')('acceptance:config');
let merge = require('deepmerge');
let codeceptjsShared = require('codeceptjs-shared');
let codeceptJsSauce = require('codeceptjs-saucelabs');

const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const DEFAULT_HOST = 'https://dev20-sitegenesis-dw.demandware.net';

const HOST = process.host || DEFAULT_HOST;

const metadata = require('./test/acceptance/metadata.json');

let conf = {
    output: OUTPUT_PATH,
    cleanup: true,
    coloredLogs: true,
    helpers: {
        REST: {},
        WebDriver: {
            url: HOST
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
                        I.amOnPage(metadata.login.loginPage);
                        I.fillField(metadata.login.emailLogin, metadata.login.email);
                        I.fillField(metadata.login.passwordLogin, metadata.login.password);
                        I.click(metadata.login.primaryButton);
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

exports.config = merge(merge(conf, codeceptjsShared.conf), codeceptJsSauce.conf);

const debug = require('debug')('acceptance:config');
let merge = require('deepmerge');
let codeceptjsShared = require('codeceptjs-shared');
let codeceptJsSauce = require('codeceptjs-saucelabs');

const RELATIVE_PATH = './test/acceptance';
const OUTPUT_PATH = RELATIVE_PATH + '/report';
const DEFAULT_HOST = 'https://dev20-sitegenesis-dw.demandware.net';

const metadata = require('./test/acceptance/metadata.json');

const HOST = process.env.HOST || DEFAULT_HOST;

let conf = {
    output: OUTPUT_PATH,
    cleanup: true,
    coloredLogs: true,
    helpers: {
        REST: {},
        WebDriver: {
            url: HOST,
            waitForTimeout: 10000
        }
    },
    plugins: {
        wdio: {
            enabled: true,
            services: ['selenium-standalone']
        },
        retryFailedStep: {
            enabled: true,
            retries: 3
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

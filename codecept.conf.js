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

// {browser: 'safari', windowSize: '800x600'},
// {browser: 'chrome', windowSize: '360x640'}, //galaxy
// {browser: 'chrome', windowSize: '375x812'}, //iphone X
// {browser: 'chrome', windowSize: '768x1024'}, //ipad
// {browser: 'chrome', windowSize: '400x1219'}, //responsive
// {browser: 'firefox', windowSize: '360x640'}, //galaxy
// {browser: 'firefox', windowSize: '375x812'}, //iphone X
// {browser: 'firefox', windowSize: '768x1024'}, //ipad
// {browser: 'firefox', windowSize: '400x1219'}, //responsive
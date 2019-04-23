/* eslint-disable quotes */
/* eslint-disable comma-dangle */
/* eslint-disable indent */

const codeceptConfig = require('./codecept.conf');
const merge = require('deepmerge');

const sauceLabsConf = {
    helpers: {
        WebDriver: {
            url: "https://ecom-2015234003.vpod.t.force.com/",
            browser: "chrome",
            host: "ondemand.saucelabs.com",
            port: 443,
            user: "jsautomation",
            key: "eb4958c7-b945-4ccd-a1d3-0ba226f7f8ff"
        }
    }
};

exports.config = merge(sauceLabsConf, codeceptConfig.config);

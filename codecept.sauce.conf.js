let debug = require('debug')('acceptance:sauce:config');

let browsers = {
    chrome: {
        browser: 'chrome',
        windowSize: '360x640'
        // add more configuration for Saucelabs platform
    },
    firefox: {
        browser: 'firefox',
    },
    safari: {
        browser: 'safari',
    },
    edge: {
        browser: 'MicrosoftEdge',
    },
    ie: {
        browser: 'internet explorer',
    }
};

function getBrowsers() {
    if (process.profile) {
        let multibrowsers = [];
        let sauceBrowsers = process.profile.split(':')[1].split(',');
        debug('requested multibrowsers:', sauceBrowsers);
        sauceBrowsers.forEach(browser => {
            multibrowsers.push(browsers[browser]);
        });
        debug('multibrowsers saucelabs conf:', multibrowsers);
        return multibrowsers;
    }

    return [browsers.chrome];
}

let conf = {
  helpers: {
    WebDriver: getBrowsers()[0],
    SauceHelper: {
        require: "codeceptjs-saucehelper",
        user: 'sso-saleforce-c.thorsen',
        key: '7f91c455-a16d-4174-9361-25688ea92e23'
    },
  },
  plugins: {
    wdio: {
      enabled: true,
      services: ['sauce'],
      //   user: process.env.SAUCE_USERNAME,
      //   key: process.env.SAUCE_KEY,
      user: 'sso-saleforce-c.thorsen',
      key: '7f91c455-a16d-4174-9361-25688ea92e23',
      region: 'us'
    }
  },
  multiple: {
      multibrowsers: {
          chunks: getBrowsers().length,
          browsers: getBrowsers()
        },
    }
};

exports.conf = conf;

// capabilities: { [{
//     // IE11 on Windows 7
//     browserName: 'internet explorer',
//     platform: 'Windows 7',
//     version: '11'
//     }, {
//         // Chrome on iPhone X
//         browserName: 'chrome',
//         platform: 'Windows 10',
//         screenResolution: '1920x1080'
//     }, {
//         // Safari on iPAD
//         browserName: 'safari',
//         platform: 'OS X 10.11',
//         version: '10.0',
//         screenResolution: '1152x864'
//     }, {
//         // Firefox on Linux
//         browserName: 'firefox',
//         platform: 'Linux'
//     }, {
//         // Edge on Windows 10
//         browserName: 'MicrosoftEdge',
//         platform: 'Windows 10',
//     }]
// }
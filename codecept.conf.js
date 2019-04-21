exports.config = {
    output: './test/acceptance/report',
    helpers: {
        WebDriver: {
            url: 'http://localhost',
            browser: 'chrome'
        }
    },
    include: {
        I: '.test/acceptance/steps'
    },
    mocha: {},
    bootstrap: null,
    teardown: null,
    hooks: [],
    gherkin: {
        features: './test/acceptance/features/*.feature',
        steps: ['./test/acceptance/step_definitions/steps.js']
    },
    plugins: {
        screenshotOnFail: {
            enabled: true
        },
        wdio: {
            services: ['selenium-standalone']
        }
    },
    name: 'storefront-reference-architecture'
};

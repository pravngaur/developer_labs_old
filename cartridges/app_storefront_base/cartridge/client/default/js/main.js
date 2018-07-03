window.jQuery = window.$ = require('jquery');
var processInclude = require('./util');

$(document).ready(function () {
    processInclude(require('./components/menu'));
    processInclude(require('./components/cookie'));
    processInclude(require('./components/consentTracking'));
    processInclude(require('./components/footer'));
    processInclude(require('./components/miniCart'));
    processInclude(require('./components/collapsibleItem'));
    processInclude(require('./components/search'));
    processInclude(require('./components/clientSideValidation'));
    processInclude(require('./components/countrySelector'));
});

require('./thirdParty/bootstrap');
require('./components/spinner');
var Raven = require('raven-js');
Raven.config('https://9f785502492541d18796ea3692bcf057@sentry.io/1236218').install();

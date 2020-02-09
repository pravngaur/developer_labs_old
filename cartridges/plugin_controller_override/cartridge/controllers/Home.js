/* eslint-disable no-use-before-define */
var server = require('server');
var UrlUtils = require('dw/web/URLUtils');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');
var cache = require('*/cartridge/scripts/middleware/cache');
var Site = require('dw/system/Site');

server.extend(module.superModule);


/**
 * Default-Start controller override: to ensure user gets redirected to the desired locale, based on the request source.
 * New middleware added to verify the country & request locale -- if not a pair, redirect to correct locale.
 */
server.prepend('Show',consentTracking.consent, cache.applyDefaultCache, function(req, res, next) {
    //Placing the redirection logic behind the enableLocaleRedirect toggle -- evaluation redirection if toggle is set to true.
    var customPrefs = Site.getCurrent().getPreferences().getCustom();
    if( ('enableLocaleRedirect' in customPrefs) && customPrefs.enableLocaleRedirect ){
        var countryCode = req.geolocation.countryCode;
        var locale = req.locale;
        if ((countryCode && countryCode === 'US') && (locale && locale.id !== 'en_US')){
            localeHelper(req, res, 'en_US');
        } else if ((countryCode && countryCode === 'GB') && (locale && locale.id !== 'en_GB')){
            localeHelper(req, res, 'en_GB');
        } else if ((countryCode && countryCode === 'IN') && (locale && locale.id !== 'en_IN')){
            localeHelper(req, res, 'en_IN');
        }
    }
    
    next();
}, pageMetaData.computedPageMetaData);

var localeHelper = function (req, res, newLocale) {
    if (req && res && newLocale) {
        req.setLocale(newLocale);
        var redirectURL = UrlUtils.home();
        res.redirect(redirectURL);
    }
};

module.exports = server.exports();
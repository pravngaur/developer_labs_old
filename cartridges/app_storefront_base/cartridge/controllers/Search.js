'use strict';

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.get('UpdateGrid', cache.applyPromotionSensitiveCache, function (req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, req.querystring);
    apiProductSearch.search();
    var productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );

    res.render('/search/productGrid', {
        productSearch: productSearch
    });

    next();
});

server.get('Refinebar', cache.applyDefaultCache, function (req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var ProductSearch = require('*/cartridge/models/search/productSearch');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, req.querystring);
    apiProductSearch.search();
    var productSearch = new ProductSearch(
        apiProductSearch,
        req.querystring,
        req.querystring.srule,
        CatalogMgr.getSortingOptions(),
        CatalogMgr.getSiteCatalog().getRoot()
    );
    res.render('/search/searchRefineBar', {
        productSearch: productSearch,
        querystring: req.querystring
    });

    next();
}, pageMetaData.computedPageMetaData);

server.get('ShowAjax', cache.applyShortPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var result = searchHelper.search(req);

    if (result.searchRedirect) {
        res.redirect(result.searchRedirect);
        return next();
    }

    res.render('search/searchResultsNoDecorator', {
        productSearch: result.productSearch,
        maxSlots: result.maxSlots,
        reportingURLs: result.reportingURLs,
        refineurl: result.refineurl
    });

    return next();
}, pageMetaData.computedPageMetaData);

server.get('Show', cache.applyShortPromotionSensitiveCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var template = 'search/searchResults';

    var result = searchHelper.search(req);

    if (result.searchRedirect) {
        res.redirect(result.searchRedirect);
        return next();
    }

    if (result.category && result.categoryTemplate) {
        template = result.categoryTemplate;
    }

    res.render(template, {
        productSearch: result.productSearch,
        maxSlots: result.maxSlots,
        reportingURLs: result.reportingURLs,
        refineurl: result.refineurl,
        category: result.category ? result.category : null
    });

    return next();
}, pageMetaData.computedPageMetaData);

server.get('Content', cache.applyDefaultCache, consentTracking.consent, function (req, res, next) {
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');

    var contentSearch = searchHelper.setupContentSearch(req.querystring);
    res.render('/search/contentGrid', {
        contentSearch: contentSearch
    });
    next();
});

module.exports = server.exports();

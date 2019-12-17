'use strict';

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');
var pageMetaData = require('*/cartridge/scripts/middleware/pageMetaData');

server.get('UpdateGrid', function (req, res, next) {
    var CatalogMgr = require('dw/catalog/CatalogMgr');
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var ProductSearch = require('*/cartridge/models/search/productSearch');

    var apiProductSearch = new ProductSearchModel();
    apiProductSearch = searchHelper.setupSearch(apiProductSearch, req.querystring);
    var viewData = {
        apiProductSearch: apiProductSearch
    };
    res.setViewData(viewData);

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        apiProductSearch.search();

        if (!apiProductSearch.personalizedSort) {
            searchHelper.applyCache(res);
        }
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

    var result = searchHelper.search(req, res);

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
    var ProductSearchModel = require('dw/catalog/ProductSearchModel');
    var searchHelper = require('*/cartridge/scripts/helpers/searchHelpers');
    var template = 'search/searchResults';

    var apiProductSearch = new ProductSearchModel();
    var viewData = {
        apiProductSearch: apiProductSearch
    };
    res.setViewData(viewData);

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var result = searchHelper.search(req, res);
        var Resource = require('dw/web/Resource');

        if (result.searchRedirect) {
            res.redirect(result.searchRedirect);
            return;
        }

        if (result.category && result.categoryTemplate) {
            template = result.categoryTemplate;
        }

    	if(true){ // add overide to skip this ability
    		var URLUtils = require('dw/web/URLUtils');
            var currentClick;
            var limit = 10;// pass down this variable
            var clicks = req.session.clickStream.clicks.reverse().slice(0, limit);
            var productClick = null;
            var productClickPos = 0;
            var searchClick = null;
            var searchClickPos = 0;
            var counter = 0;
            var done = false;

            var backClicks = clicks.filter(function(click) {
            	var pipelineName = click.pipelineName.toString();
            	if (counter === 0) {
            		currentClick = click;
            		counter++;
            		return true;
            	}    
            	
            	if (click.pipelineName.indexOf('Product-Show') > -1 && productClick == null && !done) {
            		productClick = click;
            		productClickPos = counter;
            		counter++
            		return true;
            	}         	

            	// find the last search-show call
            	// add logic to check it against other endpoints
            	// 1. update grid
            	// 2. more button
            	// 3. showAjax
            	if ((click.pipelineName.indexOf('Search-Show') > -1 && searchClick == null) 
            		|| (click.pipelineName.indexOf('Search-UpdateGrid') > -1 && searchClick == null)
            		|| (click.pipelineName.indexOf('Search-ShowAjax') > -1 && searchClick == null)
            	) {
            		searchClick = click;
            		searchClickPos = counter;
        		    counter++;
        		    done = true;
        		    return true;
        	    }     	
            	counter++;
            	return false;
            	if (done) {
            		return false;
            	} else {
            	    return true;
            	}
            });
        	
            var wearedone;
        	if (backClicks.length < 3){
        		wearedone = true;
        	} else if (backClicks.length === 3){
        		wearedone = false;
        		
        		var strCurrent = currentClick.queryString;
        		var strCurrentArray = strCurrent.split('&')
        		var paramCurrentArray = [];
        		var valueCurrentArray = [];
        		var cgidCurrentValue;
        		var qCurrentValue;       		
        		
        		strCurrentArray.forEach(function (strElement, i) {
        		  var strElementSplit = strElement.split('=');
        		  if(strElementSplit[0] === 'cgid') {
        			  cgidCurrentValue = strElementSplit[1]
        		  }
        		  if(strElementSplit[0] === 'q'){
        			  qCurrentValue = strElementSplit[1]
        		  }
        		  if(strElementSplit[0] === 'sz'){
        			  
        			  var test1 = 0;
        			  //qCurrentValue = strElementSplit[1]
        		  }
        		  if(strElementSplit[0] === 'start'){
        			  
        			  var test1 = 0;
        			  //qCurrentValue = strElementSplit[1]
        		  }
        		  paramCurrentArray.push(strElementSplit[0]);
        		  valueCurrentArray.push(strElementSplit[1]);
        		});

        		var str = searchClick.queryString;
        		var strArray = str.split('&')
        		var paramArray = [];
        		var valueArray = [];
        		var cgidValue;
        		var qValue;
        		var szPos;
        		var startPos;
        		
        		
        		strArray.forEach(function (strElement2, i) {
        		  var strElementSplit2 = strElement2.split('=');
        		  if(strElementSplit2[0] === 'cgid') {
        			  cgidValue = strElementSplit2[1]
        		  }
        		  if(strElementSplit2[0] === 'q'){
        			  qValue = strElementSplit2[1]
        		  }
        		  
        		  if(strElementSplit2[0] === 'sz'){
        			  szPos = i;
        			  var test1 = 0;
        			  //qCurrentValue = strElementSplit[1]
        		  }
        		  if(strElementSplit2[0] === 'start'){
        			  startPos = i;
        			  var test1 = 0;
        			  //qCurrentValue = strElementSplit[1]
        		  }
        		  paramArray.push(strElementSplit2[0]);
        		  valueArray.push(strElementSplit2[1]);
        		  
        		  
        		});
        		
        		
        		// alter the sz and start parameters
        		//flip the arrays
        		
        		
        		// check cgid or q parameter
        		// make sure it matches or exit
        		if ( (cgidCurrentValue && cgidCurrentValue == cgidValue) || (qCurrentValue && qCurrentValue == qValue) ) {
            		//build url and n number of parameters
            		var redirectUrl = URLUtils.url('Search-Show');
            		// build url and n number of parameters
            		
            		
            		var redirectUrl1;// = redirectUrl.append(paramArray[0], valueArray[0]);
            		var redirectUrl2;// = redirectUrl1.append(paramArray[1], valueArray[1]);
            		
            		paramArray.forEach(function (param, i) {
            			redirectUrl.append(paramArray[i], valueArray[i]);
            		});
            		
            		
        			// var test = redirectUrl2.toString();
        			var hey1;
            		hey1 = 0;
            		hey1++;            		
            		//
            		//redirect to that url
            		
            		res.redirect(redirectUrl);
            		
        		} else {
	        		var hey;
	        		hey = 0;
	        		hey++;
        		}
        		

        		
        		

        		

        	}

        	var urlx = URLUtils.url('Home-Show')+'&cgid=womens-clothing-tops&start=0&sz=24';
        	
        	//?cgid=womens-clothing-tops&start=0&sz=24
        	// var urlx2 = URLUtils.url('Search-Show')+'&cgid=womens-clothing-tops&start=0&sz=24'; ///s/RefArch/search?lang=en_US&cgid=womens-clothing-tops&start=0&sz=24
        	// https://ecom-2015296030-stg.vpod.t.force.com/s/RefArch/womens/clothing/tops/?lang=en_US&start=0&sz=24&&prefn1=refinementColor&prefv1=Blue&page=0
        	// https://ecom-2015296030-stg.vpod.t.force.com/on/demandware.store/Sites-RefArch-Site/en_US/Search-ShowAjax?cgid=womens-clothing-tops&prefn1=refinementColor&prefv1=Blue&page=0&selectedUrl=%2Fon%2Fdemandware.store%2FSites-RefArch-Site%2Fen_US%2FSearch-ShowAjax%3Fcgid%3Dwomens-clothing-tops%26prefn1%3DrefinementColor%26prefv1%3DBlue
        }
        
        res.render(template, {
            productSearch: result.productSearch,
            maxSlots: result.maxSlots,
            reportingURLs: result.reportingURLs,
            refineurl: result.refineurl,
            category: result.category ? result.category : null,
            canonicalUrl: result.canonicalUrl,
            schemaData: result.schemaData,
            pushStateTitle: Resource.msg('plp.pushstate.title', 'search', null)
        });
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

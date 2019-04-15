'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var CatalogMgr = require('dw/catalog/CatalogMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');

/**
 * Render logic for rule driven product tile.
 */
module.exports.render = function (context) {
    var model = new HashMap();

    var content = context.content;

    var sortingRuleID = content.sorting_rule;
    var sortingRule = sortingRuleID ? CatalogMgr.getSortingRule(sortingRuleID) : null;

    model.url = URLUtils.url('Home-Show');

    if (sortingRule) {
        var searchModel = new ProductSearchModel();
        searchModel.setCategoryID('root');
        if (content.category) {
            searchModel.setCategoryID(content.category.ID);
        }
        searchModel.setSortingRule(sortingRule);
        searchModel.search();
        var hits = searchModel.getProductSearchHits();
        var product = hits ? searchModel.getProductSearchHits().next().product : null;
        if (product) {
            var images = product.getImages('large'); // make the product image type configurable by the component?
            var productImage = images.iterator().next();
            if (productImage) {
                model.image = {
                    src : productImage.getAbsURL(),
                    alt : productImage.getAlt()
                };
            }
            if (!content.text_headline && product) {
                content.text_headline = product.getName();
            }

            // fallback to product link or home page if no shopping link is explicitly given
            if (!content.shop_now_target) {
                model.url = URLUtils.url('Product-Show', 'pid', product.ID);
            } else {
                model.url = content.shop_now_target;
            }
        }
    }

    model.text_headline = content.text_headline;

    return new Template('experience/components/assets/producttile').render(model).text;
};

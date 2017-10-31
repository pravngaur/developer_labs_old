'use strict';

var PromotionMgr = require('dw/campaign/PromotionMgr');
var ArrayList = require('dw/util/ArrayList');
var pricingHelper = require('*/cartridge/scripts/helpers/pricing');
var PriceBookMgr = require('dw/catalog/PriceBookMgr');
var DefaultPrice = require('*/cartridge/models/price/default');
var RangePrice = require('*/cartridge/models/price/range');

/**
 * Retrieve promotions that apply to current product
 * @param {dw.catalog.ProductSearchHit} searchHit - current product returned by Search API.
 * @param {[string]} activePromotions - array of ids of currently active promotions
 * @return {[Promotion]} - Array of promotions for current product
 */
function getPromotions(searchHit, activePromotions) {
    var productPromotionIds = searchHit.discountedPromotionIDs;

    var promotions = new ArrayList();
    activePromotions.forEach(function (promoId) {
        var index = productPromotionIds.indexOf(promoId);
        if (index > -1) {
            promotions.add(PromotionMgr.getPromotion(productPromotionIds[index]));
        }
    });

    return promotions;
}

/**
 * Get list price for a given product
 * @param {dw.catalog.ProductSearchHit} hit - current product returned by Search API.
 * @param {function} getSearchHit - function to find a product using Search API.
 *
 * @returns {Object} - price for a product
 */
function getListPrices(hit, getSearchHit) {
    var priceModel = hit.firstRepresentedProduct.getPriceModel();
    if (!priceModel.priceInfo) {
        return {};
    }
    var rootPriceBook = pricingHelper.getRootPriceBook(priceModel.priceInfo.priceBook);
    if (rootPriceBook === priceModel.priceInfo.priceBook) {
        return {};
    }
    var searchHit;

    try {
        PriceBookMgr.setApplicablePriceBooks(rootPriceBook);
        searchHit = getSearchHit(hit.product);
    } catch (e) {
        searchHit = hit;
    } finally {
        PriceBookMgr.setApplicablePriceBooks(priceModel.priceInfo.priceBook);
    }

    if (searchHit) {
        return { minPrice: searchHit.minPrice, maxPrice: searchHit.maxPrice };
    }

    return {};
}

module.exports = function (object, searchHit, activePromotions, getSearchHit) {
    Object.defineProperty(object, 'price', {
        enumerable: true,
        value: (function () {
            var salePrice = { minPrice: searchHit.minPrice, maxPrice: searchHit.maxPrice };
            var promotions = getPromotions(searchHit, activePromotions);
            if (!promotions.empty) {
                var promotionalPrice = pricingHelper.getPromotionPrice(searchHit.firstRepresentedProduct, promotions);
                salePrice = { minPrice: promotionalPrice, maxPrice: promotionalPrice };
            }
            var listPrice = getListPrices(searchHit, getSearchHit);

            if (salePrice.minPrice.value !== salePrice.maxPrice.value) {
                // range price
                return new RangePrice(salePrice.minPrice, salePrice.maxPrice);
            }
            if (listPrice.minPrice && listPrice.minPrice.valueOrNull !== null) {
                if (listPrice.minPrice.value !== salePrice.minPrice.value) {
                    return new DefaultPrice(salePrice.minPrice, listPrice.minPrice);
                }
            }
            return new DefaultPrice(salePrice.minPrice);
        }())
    });
};

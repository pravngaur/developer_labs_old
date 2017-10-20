'use strict';

var PromotionMgr = require('dw/campaign/PromotionMgr');
var ArrayList = require('dw/util/ArrayList');
var priceFactory = require('*/cartridge/scripts/factories/price');

/**
 * Convert promotion into a JSON object
 *
 * @param {[dw.campaign.Promotion]} promotions - Promotions that apply to this product
 * @return {Promotion} - JSON representation of Promotion instance
 */
function convertPromotions(promotions) {
    return promotions.map(function (promotion) {
        return {
            calloutMsg: promotion.calloutMsg ? promotion.calloutMsg.markup : null,
            details: promotion.details ? promotion.details.markup : null,
            enabled: promotion.enabled,
            id: promotion.ID,
            name: promotion.name,
            promotionClass: promotion.promotionClass,
            rank: promotion.rank
        };
    });
}

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

module.exports = function (object, searchHit, activePromotions) {
    Object.defineProperty(object, 'price', {
        enumerable: true,
        value: priceFactory.getPrice(searchHit, null, true, getPromotions(searchHit, activePromotions))
    });
};

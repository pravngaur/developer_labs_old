'use strict';

var collection = require('*/cartridge/scripts/util/collections');
var BasketMgr = require('dw/order/BasketMgr');
var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * Convert bundled products to models
 * @param {dw.catalog.Product} apiProduct - Product returned by the API
 * @param {number} quantity - selected quantity
 * @param {Object} factory - Product Factory object
 *
 * @returns {[Object]} - returns an array of bundle product models
 */
function getBonusUnitPrice(product, duuid) {


    var productFull = ProductMgr.getProduct(product.id);
    var currentBasket = BasketMgr.getCurrentBasket();
    var bonusDisconutLineItem;
    var bonusDisconutLineItems = currentBasket.getBonusDiscountLineItems().toArray();
    
    // ${pdict.BonusDiscountLineItem.getBonusProductPrice(productFull)}
    
    bonusDisconutLineItems.forEach(function (dli) {
        if (dli.UUID === duuid) {
                bonusDisconutLineItem = dli;
        }
    });
    
    
    // 
    return bonusDisconutLineItem.getBonusProductPrice(productFull).toFormattedString();//bonusDisconutLineItem.getBonusProductPrice(productFull)
}

module.exports = function (object, apiProduct, duuid) {
    Object.defineProperty(object, 'bonusUnitPrice', {
        enumerable: true,
        value: getBonusUnitPrice(object, duuid)
    });
};

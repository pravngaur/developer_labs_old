'use strict';

// var collection = require('*/cartridge/scripts/util/collections');
var BasketMgr = require('dw/order/BasketMgr');
var ProductMgr = require('dw/catalog/ProductMgr');

/**
 * returns the price of the bonus product
 * @param {Object} product - Product object
 * @param {string} duuid - discount line item UUID
 *
 * @returns {string} - returns the price of the bonus product
 */
function getBonusUnitPrice(product, duuid) {
    var productFull = ProductMgr.getProduct(product.id);
    var currentBasket = BasketMgr.getCurrentBasket();
    var bonusDisconutLineItem;
    var bonusDisconutLineItems = currentBasket.getBonusDiscountLineItems().toArray();

    bonusDisconutLineItems.forEach(function (dli) {
        if (dli.UUID === duuid) {
            bonusDisconutLineItem = dli;
        }
    });

    return bonusDisconutLineItem.getBonusProductPrice(productFull).toFormattedString();
}

module.exports = function (object, duuid) {
    Object.defineProperty(object, 'bonusUnitPrice', {
        enumerable: true,
        value: getBonusUnitPrice(object, duuid)
    });
};

'use strict';

var BasketMgr = require('dw/order/BasketMgr');
var ProductMgr = require('dw/catalog/ProductMgr');
var collections = require('*/cartridge/scripts/util/collections');

/**
 * returns the price of the bonus product
 * @param {Object} product - Product object
 * @param {string} duuid - discount line item UUID
 * @returns {string} - returns the price of the bonus product
 */
function getBonusUnitPrice(product, duuid) {
    var productFull = ProductMgr.getProduct(product.id);
    var currentBasket = BasketMgr.getCurrentBasket();

    var bonusDisconutLineItem = collections.find(currentBasket.getBonusDiscountLineItems(), function (dli) {
        return dli.UUID === duuid;
    });

    return bonusDisconutLineItem.getBonusProductPrice(productFull).toFormattedString();
}

module.exports = function (object, duuid) {
    Object.defineProperty(object, 'bonusUnitPrice', {
        enumerable: true,
        value: getBonusUnitPrice(object, duuid)
    });
};

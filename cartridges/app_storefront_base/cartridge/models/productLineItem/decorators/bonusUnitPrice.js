'use strict';

/**
 * returns the price of the bonus product line item
 * @param {Object} product - a line item of the basket.
 * @param {Array} bonusDiscountLineItems - array of bonus discount line items
 * @param {dw.order.ProductLineItem} lineItem - API ProductLineItem instance
 * @returns {string} result the price of the bonus product
 */
function getPrice(product, bonusDiscountLineItems, lineItem) {
    var value = 0;
    bonusDiscountLineItems.forEach(function (bonusDiscountLineItem) {
        if (bonusDiscountLineItem.custom.bonusProductLineItemUUID === lineItem.custom.bonusProductLineItemUUID) {
            value = bonusDiscountLineItem.getBonusProductPrice(product).toFormattedString();
        }
    });
    return value;
}

module.exports = function (object, lineItem, product, bonusDiscountLineItems) {
    Object.defineProperty(object, 'bonusUnitPrice', {
        enumerable: true,
        value: getPrice(product, bonusDiscountLineItems, lineItem)
    });
};

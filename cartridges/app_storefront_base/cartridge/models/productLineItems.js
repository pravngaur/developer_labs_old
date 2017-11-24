'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var ProductFactory = require('*/cartridge/scripts/factories/product');

/**
 * Creates an array of product line items
 * @param {dw.util.Collection <dw.order.ProductLineItem>} allLineItems - All product
 * line items of the basket
 * @returns {Array} an array of product line items.
 */
function createProductLineItemsObject(allLineItems) {
    var lineItems = [];
    var bonusQulifiers = [];
    collections.forEach(allLineItems, function (item) {
        if (item.custom.bonusProductLineItemUUID === 'bonus') {
            bonusQulifiers.push(item.UUID);
        }
    });

    collections.forEach(allLineItems, function (item) {
        if (!item.product) { return; }
        var options = collections.map(item.optionProductLineItems, function (optionItem) {
            return {
                optionId: optionItem.optionID,
                selectedValueId: optionItem.optionValueID
            };
        });

        var pview = 'productLineItem';

        if (!item.bonusProductLineItem && item.custom.bonusProductLineItemUUID) {
            pview = 'bonusProductLineItem';
        }

        if (item.bonusProductLineItem && bonusQulifiers.indexOf(item.custom.bonusProductLineItemUUID) > -1) {
            pview = 'embeddedProductLineItem';
        }

        var params = {
            pid: item.product.ID,
            quantity: item.quantity.value,
            variables: null,
            pview: pview,
            lineItem: item,
            options: options
        };

        lineItems.push(ProductFactory.get(params));
        // reconstruct the model based on the needed nesting
        // TODO add the price to the product if it is of type embdedproductlineitem
    });

    return lineItems;
}

/**
 * Loops through all of the product line items and adds the quantities together.
 * @param {dw.util.Collection <dw.order.ProductLineItem>} items - All product
 * line items of the basket
 * @returns {number} a number representing all product line items in the lineItem container.
 */
function getTotalQuantity(items) {
    // TODO add giftCertificateLineItems quantity
    var totalQuantity = 0;
    collections.forEach(items, function (lineItem) {
        totalQuantity += lineItem.quantity.value;
    });

    return totalQuantity;
}

/**
 * @constructor
 * @classdesc class that represents a collection of line items and total quantity of
 * items in current basket or per shipment
 *
 * @param {dw.util.Collection<dw.order.ProductLineItem>} productLineItems - the product line items
 *                                                       of the current line item container
 */
function ProductLineItems(productLineItems) {
    if (productLineItems) {
        this.items = createProductLineItemsObject(productLineItems);
        this.totalQuantity = getTotalQuantity(productLineItems);
    } else {
        this.items = [];
        this.totalQuantity = 0;
    }
}

ProductLineItems.getTotalQuantity = getTotalQuantity;

module.exports = ProductLineItems;

'use strict';

var HookMgr = require('dw/system/HookMgr');
var TotalsModel = require('*/cartridge/models/totals');
var ProductLineItemsModel = require('*/cartridge/models/productLineItems');

/**
 * @constructor
 * @classdesc MiniCart Model class that represents the current basket & is lighter
 * version of Basket Model
 *
 * @param {dw.order.Basket} basket - Current users's basket
 */
function MiniCartModel(basket) {
    if (basket !== null) {
        var cartHelpers = require('*/cartridge/scripts/cart/cartHelpers');
        var productLineItemsModel = new ProductLineItemsModel(basket.productLineItems, 'basket');
        var totalsModel = new TotalsModel(basket);
        this.totals = totalsModel;
        this.items = productLineItemsModel.items;
        this.numItems = productLineItemsModel.totalQuantity;
        this.actionUrls = cartHelpers.getCartActionUrls();
        this.valid = HookMgr.callHook(
            'app.validate.basket',
            'validateBasket',
            basket,
            false
        );
    } else {
        this.items = [];
        this.numItems = 0;
    }
}

module.exports = MiniCartModel;

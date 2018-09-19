'use strict';

var Resource = require('dw/web/Resource');
var PromotionMgr = require('dw/campaign/PromotionMgr');
var MiniCart = require('*/cartridge/models/minicart');

/**
 * @constructor
 * @classdesc CartModel class that represents the current basket
 *
 * @param {dw.order.Basket} basket - Current users's basket
 * @param {Object} options - objects to include in response
 */
function CartModel(basket, options) {
    if (basket !== null) {
        MiniCart.call(this, basket);

        this.hasBonusProduct = Boolean(basket.bonusLineItems && basket.bonusLineItems.length);
        this.numOfShipments = basket.shipments.length;

        if (options && options.includeShipments) {
            var ShippingHelpers = require('*/cartridge/scripts/checkout/shippingHelpers');
            var shippingModels = ShippingHelpers.getShippingModels(basket, null, 'basket');
            if (shippingModels) {
                this.shipments = shippingModels.map(function (shippingModel) {
                    var result = {};
                    result.shippingMethods = shippingModel.applicableShippingMethods;
                    if (shippingModel.selectedShippingMethod) {
                        result.selectedShippingMethod = shippingModel.selectedShippingMethod.ID;
                    }
                    return result;
                });
            }
        }

        var discountPlan = PromotionMgr.getDiscounts(basket);
        if (discountPlan) {
            Object.defineProperty(this, 'approachingDiscounts', {
                enumerable: true,
                get: function () {
                    var cartHelpers = require('*/cartridge/scripts/cart/cartHelpers');
                    return cartHelpers.getApproachingDiscounts(basket, discountPlan);
                }
            });
        }
    } else {
        this.items = [];
        this.numItems = 0;
    }

    this.resources = {
        numberOfItems: Resource.msgf('label.number.items.in.cart', 'cart', null, this.numItems),
        emptyCartMsg: Resource.msg('info.cart.empty.msg', 'cart', null)
    };
}

CartModel.prototype = Object.create(MiniCart.prototype);

module.exports = CartModel;

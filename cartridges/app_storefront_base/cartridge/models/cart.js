'use strict';

var formatMoney = require('dw/util/StringUtils').formatMoney;
var collections = require('*/cartridge/scripts/util/collections');

var HookMgr = require('dw/system/HookMgr');
var URLUtils = require('dw/web/URLUtils');
var Resource = require('dw/web/Resource');
var PromotionMgr = require('dw/campaign/PromotionMgr');

var TotalsModel = require('*/cartridge/models/totals');
var ProductLineItemsModel = require('*/cartridge/models/productLineItems');

var ShippingHelpers = require('*/cartridge/scripts/checkout/shippingHelpers');

/**
 * Generates an object of approaching discounts
 * @param {dw.order.Basket} basket - Current users's basket
 * @param {dw.campaign.DiscountPlan} discountPlan - set of applicable discounts
 * @returns {Object} an object of approaching discounts
 */
function getApproachingDiscounts(basket, discountPlan) {
    var approachingOrderDiscounts;
    var approachingShippingDiscounts;
    var orderDiscountObject;
    var shippingDiscountObject;
    var discountObject;

    if (basket && basket.productLineItems) {
        // TODO: Account for giftCertificateLineItems once gift certificates are implemented
        approachingOrderDiscounts = discountPlan.getApproachingOrderDiscounts();
        approachingShippingDiscounts =
            discountPlan.getApproachingShippingDiscounts(basket.defaultShipment);

        orderDiscountObject =
            collections.map(approachingOrderDiscounts, function (approachingOrderDiscount) {
                return {
                    discountMsg: Resource.msgf(
                        'msg.approachingpromo',
                        'cart',
                        null,
                        formatMoney(
                            approachingOrderDiscount.getDistanceFromConditionThreshold()
                        ),
                        approachingOrderDiscount.getDiscount()
                            .getPromotion().getCalloutMsg()
                    )
                };
            });

        shippingDiscountObject =
            collections.map(approachingShippingDiscounts, function (approachingShippingDiscount) {
                return {
                    discountMsg: Resource.msgf(
                        'msg.approachingpromo',
                        'cart',
                        null,
                        formatMoney(
                            approachingShippingDiscount.getDistanceFromConditionThreshold()
                        ),
                        approachingShippingDiscount.getDiscount()
                            .getPromotion().getCalloutMsg()
                    )
                };
            });
        discountObject = orderDiscountObject.concat(shippingDiscountObject);
    }
    return discountObject;
}

/**
 * Generates an object of URLs
 * @returns {Object} an object of URLs in string format
 */
function getCartActionUrls() {
    return {
        removeProductLineItemUrl: URLUtils.url('Cart-RemoveProductLineItem').toString(),
        updateQuantityUrl: URLUtils.url('Cart-UpdateQuantity').toString(),
        selectShippingUrl: URLUtils.url('Cart-SelectShippingMethod').toString(),
        submitCouponCodeUrl: URLUtils.url('Cart-AddCoupon').toString(),
        removeCouponLineItem: URLUtils.url('Cart-RemoveCouponLineItem').toString()
    };
}

/**
 * Generates an object of URLs
 * @param {dw.order.BonusDiscountLineItem} item - a product line item
 * @returns {number} the total number of bonus products from within one bonus discount line item
 */
function countBonusProducts(item) {
    var bonusProductLineItems = item.bonusProductLineItems.toArray();
    var count = 0;

    bonusProductLineItems.forEach(function (bonusDiscountLineItem) {
        count += bonusDiscountLineItem.quantityValue;
    });
    return count;
}

/**
 * Generates an object of URLs
 * @param {dw.util.Collection} bonsDiscountLineItems - collection of bonus discount line items associated with the basket
 * @returns {Object} json object used to represnt the view's data for displaying bonus products button on the cart page
 */
function getDiscountLineItems(bonsDiscountLineItems) {
    var items = bonsDiscountLineItems.toArray();
    var result = [];
    items.forEach(function (item) {
        var bdliObj = {};
        bdliObj.pliuuid = item.custom.bonusProductLineItemUUID;
        bdliObj.uuid = item.UUID;
        bdliObj.full = countBonusProducts(item) < item.maxBonusItems;
        bdliObj.maxpids = item.maxBonusItems;
        bdliObj.url = URLUtils.url('Cart-EditBonusProduct').toString() + '?duuid=' + item.UUID;
        bdliObj.msg = bdliObj.full ? Resource.msg('button.bonus.select', 'cart', null) : Resource.msg('button.bonus.change', 'cart', null);
        result.push(bdliObj);
    });

    return result;
}

/**
 * Embbeds the bonus products within a qualifying product line item
 * @param {Object} productLineItemsModel - json representation of the products line items model
 * @param {Array} discountLineItems - array of discount line items associated with the basket
 * @returns {Array} of all the items with bonus products nested within the qualifying product line item
 */
function embedBonusLineItems(productLineItemsModel, discountLineItems) {
    var allBonusItems = productLineItemsModel.items.filter(function (item) {
        var returnBool;
        if (item.bonusProductLineItemUUID && item.bonusProductLineItemUUID !== 'bonus') {
            returnBool = true;
        } else {
            returnBool = false;
        }
        return returnBool;
    });
    var allItems = productLineItemsModel.items.filter(function (item) {
        var returnBool;
        if (item.bonusProductLineItemUUID && item.bonusProductLineItemUUID !== 'bonus') {
            returnBool = false;
        } else {
            allBonusItems.forEach(function (bitem) {
                if (bitem.bonusProductLineItemUUID === item.UUID) {
                    item.embededBonusProductLineItems.push(bitem);
                }
            });
            discountLineItems.forEach(function (bdlitem) {
                if (bdlitem.pliuuid === item.UUID && item.embededBonusDiscountLineItems) {
                    item.embededBonusDiscountLineItems.push(bdlitem);
                }
            });
            returnBool = true;
        }
        return returnBool;
    });

    return allItems;
}

/**
 * @constructor
 * @classdesc CartModel class that represents the current basket
 *
 * @param {dw.order.Basket} basket - Current users's basket
 * @param {dw.campaign.DiscountPlan} discountPlan - set of applicable discounts
 */
function CartModel(basket) {
    if (basket !== null) {
        var shippingModels = ShippingHelpers.getShippingModels(basket);
        var productLineItemsModel = new ProductLineItemsModel(basket.productLineItems);

        var totalsModel = new TotalsModel(basket);
        var discountLineItems = getDiscountLineItems(basket.bonusDiscountLineItems);

        var productLineItems = embedBonusLineItems(productLineItemsModel, discountLineItems);

        this.hasBonusProduct = Boolean(basket.bonusLineItems && basket.bonusLineItems.length);
        this.actionUrls = getCartActionUrls();
        this.numOfShipments = basket.shipments.length;
        this.totals = totalsModel;
        this.allBonusItems = productLineItems;

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
        var discountPlan = PromotionMgr.getDiscounts(basket);
        if (discountPlan) {
            this.approachingDiscounts = getApproachingDiscounts(basket, discountPlan);
        }
        this.items = productLineItems;
        this.numItems = productLineItemsModel.totalQuantity;
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

    this.resources = {
        numberOfItems: Resource.msgf('label.number.items.in.cart', 'cart', null, this.numItems),
        emptyCartMsg: Resource.msg('info.cart.empty.msg', 'cart', null)
    };
}

module.exports = CartModel;

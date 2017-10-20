'use strict';

var ProductMgr = require('dw/catalog/ProductMgr');
var PromotionMgr = require('dw/campaign/PromotionMgr');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var Product = require('*/cartridge/models/product/newProduct');
var decorators = require('*/cartridge/models/product/decorators/index');
var collections = require('*/cartridge/scripts/util/collections');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
var promotionCache = require('*/cartridge/scripts/util/promotionCache');

/**
 * Get product search hit for a given product
 * @param {dw.catalog.Product} product - Product instance returned from the API
 * @returns {dw.catalog.ProductSearchHit} - product search hit for a given product
 */
function getProductSearchHit(product) {
    var searchModel = new ProductSearchModel();
    searchModel.setSearchPhrase(product.ID.replace(/-/g, ' '));
    searchModel.search();

    var hit = searchModel.getProductSearchHit(product);
    if (!hit) {
        var tempHit = searchModel.getProductSearchHits().next();
        if (tempHit.firstRepresentedProductID === product.ID) {
            hit = tempHit;
        }
    }
    return hit;
}

/**
 * Return type of the current product
 * @param  {dw.catalog.ProductVariationModel} product - Current product
 * @return {string} type of the current product
 */
function getProductType(product) {
    var result;
    if (product.master) {
        result = 'master';
    } else if (product.variant) {
        result = 'variant';
    } else if (product.variationGroup) {
        result = 'variationGroup';
    } else if (product.productSet) {
        result = 'set';
    } else if (product.bundle) {
        result = 'bundle';
    } else if (product.optionProduct) {
        result = 'optionProduct';
    } else {
        result = 'standard';
    }
    return result;
}

/**
 * Normalize product and return Product variation model
 * @param  {dw.catalog.Product} product - Product instance returned from the API
 * @param  {Object} productVariables - variables passed in the query string to
 *                                     target product variation group
 * @return {dw.catalog.ProductVarationModel} Normalized variation model
 */
function getVariationModel(product, productVariables) {
    var variationModel = product.variationModel;
    if (!variationModel.master && !variationModel.selectedVariant) {
        variationModel = null;
    } else if (productVariables) {
        var variationAttrs = variationModel.productVariationAttributes;
        Object.keys(productVariables).forEach(function (attr) {
            if (attr && productVariables[attr].value) {
                var dwAttr = collections.find(variationAttrs,
                    function (item) { return item.ID === attr; });
                var dwAttrValue = collections.find(variationModel.getAllValues(dwAttr),
                    function (item) { return item.value === productVariables[attr].value; });

                if (dwAttr && dwAttrValue) {
                    variationModel.setSelectedAttributeValue(dwAttr.ID, dwAttrValue.ID);
                }
            }
        });
    }
    return variationModel;
}

module.exports = {
    get: function (params) {
        var productId = params.pid;
        var apiProduct = ProductMgr.getProduct(productId);
        var productSearchHit = getProductSearchHit(apiProduct);
        var productType = getProductType(apiProduct);
        var product = new Product(apiProduct, productType);

        switch (productType) {
            case 'set':
            case 'bundle':
            default:
                switch (params.pview) {
                    case 'tile':
                        decorators.searchPrice(product, productSearchHit, promotionCache.promotions, true);
                        decorators.images(product, apiProduct, { types: ['medium'], quantity: 'single' });
                        decorators.ratings(product);
                        if (productType === 'variant') {
                            decorators.searchVariationAttributes(product, productSearchHit);
                        } else {
                            decorators.variationAttributes(product, getVariationModel(apiProduct, params.variables), {
                                attributes: ['color'],
                                endPoint: 'Show'
                            });
                        }
                        break;
                    case 'productLineItem':
                    default:
                        var promotions = PromotionMgr.activeCustomerPromotions.getProductPromotions(apiProduct);
                        if (params.variables) {
                            var variations = Product.getVariationModel(apiProduct, params.variables);
                            if (variations) {
                                apiProduct = variations.getSelectedVariant() || apiProduct;
                            }
                        }
                        var variationModel = getVariationModel(apiProduct, params.variables);
                        var optionsModel = productHelper.getCurrentOptionModel(apiProduct.optionModel, params.options);
                        decorators.price(product, apiProduct, promotions, false, params.options);
                        decorators.images(product, apiProduct, { types: ['large', 'small'], quantity: 'all' });
                        decorators.quantity(product, apiProduct, params.quantity);
                        decorators.variationAttributes(product, variationModel, {
                            attributes: '*',
                            endPoint: 'Variation'
                        });
                        decorators.description(product, apiProduct);
                        decorators.ratings(product);
                        decorators.promotions(product, promotions);
                        decorators.attributes(product, apiProduct.attributeModel);
                        decorators.availability(product, params.quantity, apiProduct.minOrderQuantity.value, apiProduct.availabilityModel);
                        decorators.options(product, optionsModel, params.variables, params.quantity, params.options);
                        decorators.quantitySelector(product, apiProduct.stepQuantity.value, params.variables, params.options);
                        var category = apiProduct.getPrimaryCategory()
                            ? apiProduct.getPrimaryCategory()
                            : apiProduct.getMasterProduct().getPrimaryCategory();
                        decorators.sizeChart(product, category.custom.sizeChartID);
                        decorators.currentUrl(product, variationModel, optionsModel, 'Product-Show', apiProduct.ID, params.quantity);
                        break;
                }
        }

        return product;
    }
};

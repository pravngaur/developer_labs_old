'use strict';

var collections = require('*/cartridge/scripts/util/collections');
var productHelper = require('*/cartridge/scripts/helpers/productHelpers');
var VariationAttributesModel = require('*/cartridge/models/product/productAttributes');
var ImageModel = require('*/cartridge/models/product/productImages');
var priceFactory = require('*/cartridge/scripts/factories/price');
var Resource = require('dw/web/Resource');
var baseSearch;
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
 *	returns a search hit for the current product which allows to use the enhanced functionality of the search api within the searchTile
 */
function getBaseSearch(product) {
    if (!baseSearch) {
        var searchModel = new dw.catalog.ProductSearchModel();
        searchModel.setSearchPhrase(product.ID);
        searchModel.search();

        baseSearch = searchModel.getProductSearchHit(product);
    }
    return baseSearch;
}

/**
 * Get fake rating for a product
 * @param  {string} id - Id of the product
 * @return {number} number of stars for a given product id rounded to .5
 */
function getRating(id) {
    var sum = id.split('').reduce(function (total, letter) {
        return total + letter.charCodeAt(0);
    }, 0);

    return Math.ceil((sum % 5) * 2) / 2;
}

/**
 * @typedef Promotion
 * @type Object
 * @property {string} calloutMsg - Promotion callout message
 * @property {boolean} enabled - Whether Promotion is enabled
 * @property {string} id - Promotion ID
 * @property {string} name - Promotion name
 * @property {string} promotionClass - Type of Promotion (Product, Shipping, or Order)
 * @property {number|null} rank - Promotion rank for sorting purposes
 */

/**
 * Retrieve Promotions that applies to thisProduct
 *
 * @param {dw.util.Collection.<dw.campaign.Promotion>} promotions - Promotions that apply to this
 *                                                                 product
 * @return {Promotion} - JSON representation of Promotion instance
 */
function getPromotions(promotions) {
    return collections.map(promotions, function (promotion) {
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

/**
 * Creates an object of the visible attributes for a product
 * @param {dw.catalog.Product|dw.catalog.Variant} product - Product instance returned from the API
 * @return {Object|null} an object containing the visible attributes for a product.
 */
function getAttributes(product) {
    var attributes;
    var attributeModel = product.attributeModel;
    var visibleAttributeGroups = attributeModel.visibleAttributeGroups;

    if (visibleAttributeGroups.getLength() > 0) {
        attributes = collections.map(attributeModel.visibleAttributeGroups, function (group) {
            var visibleAttributeDef = attributeModel.getVisibleAttributeDefinitions(group);
            var attributeResult = {};

            attributeResult.ID = group.ID;
            attributeResult.name = group.displayName;
            attributeResult.attributes = collections.map(
                visibleAttributeDef,
                function (definition) {
                    var definitionResult = {};
                    definitionResult.label = definition.displayName;

                    if (definition.multiValueType) {
                        definitionResult.value = attributeModel.getDisplayValue(definition).map(
                            function (item) {
                                return item;
                            });
                    } else {
                        definitionResult.value = [attributeModel.getDisplayValue(definition)];
                    }

                    return definitionResult;
                }
            );

            return attributeResult;
        });
    } else {
        attributes = null;
    }

    return attributes;
}

/**
 * Creates an object containing an array of availability messages and an in stock date
 * @param {number} quantity - quantity of products selected
 * @param {dw.catalog.Product} product - Product instance returned from the API
 * @return {Object} an object containing the product availability.
 */
function getProductAvailability(quantity, product) {
    var availability = {};
    availability.messages = [];
    var productQuantity = quantity ? parseInt(quantity, 10) : product.minOrderQuantity.value;
    var availabilityModel = product.availabilityModel;
    var availabilityModelLevels = availabilityModel.getAvailabilityLevels(productQuantity);
    var inventoryRecord = availabilityModel.inventoryRecord;

    if (inventoryRecord && inventoryRecord.inStockDate) {
        availability.inStockDate = inventoryRecord.inStockDate.toDateString();
    } else {
        availability.inStockDate = null;
    }

    if (availabilityModelLevels.inStock.value > 0) {
        if (availabilityModelLevels.inStock.value === productQuantity) {
            availability.messages.push(Resource.msg('label.instock', 'common', null));
        } else {
            availability.messages.push(
                Resource.msgf(
                    'label.quantity.in.stock',
                    'common',
                    null,
                    availabilityModelLevels.inStock.value
                )
            );
        }
    }

    if (availabilityModelLevels.preorder.value > 0) {
        if (availabilityModelLevels.preorder.value === productQuantity) {
            availability.messages.push(Resource.msg('label.preorder', 'common', null));
        } else {
            availability.messages.push(
                Resource.msgf(
                    'label.preorder.items',
                    'common',
                    null,
                    availabilityModelLevels.preorder.value
                )
            );
        }
    }

    if (availabilityModelLevels.backorder.value > 0) {
        if (availabilityModelLevels.backorder.value === productQuantity) {
            availability.messages.push(Resource.msg('label.back.order', 'common', null));
        } else {
            availability.messages.push(
                Resource.msgf(
                    'label.back.order.items',
                    'common',
                    null,
                    availabilityModelLevels.backorder.value
                )
            );
        }
    }

    if (availabilityModelLevels.notAvailable.value > 0) {
        if (availabilityModelLevels.notAvailable.value === productQuantity) {
            availability.messages.push(Resource.msg('label.not.available', 'common', null));
        } else {
            availability.messages.push(Resource.msg('label.not.available.items', 'common', null));
        }
    }

    return availability;
}

/**
 * @constructor
 * @classdesc Base product class. Used for product tiles
 * @param {dw.catalog.Product} product - Product instance returned from the API
 * @param {Object} productVariables - variables passed in the query string to
 *                                    target product variation group
 * @param {number} quantity - Integer quantity of products selected
 * @param {dw.util.Collection.<dw.campaign.Promotion>} promotions - Promotions that apply to this
 *                                                                 product
 */
function ProductBase(product, productVariables, quantity, promotions) {
    // this.variationModel = this.getVariationModel(product, productVariables);
    if (this.variationModel) {
        this.product = this.variationModel.selectedVariant || product;
    } else {
        this.product = product;
    }
    this.imageConfig = {
        types: ['medium'],
        quantity: 'single'
    };
    this.quantity = quantity || this.product.minOrderQuantity.value;

    this.variationAttributeConfig = {
        attributes: ['color'],
        endPoint: 'Show'
    };
    this.useSimplePrice = true;
    this.apiPromotions = promotions;
    this.initialize();
}

ProductBase.prototype = {
    initialize: function () {
        this.id = this.product.ID;
        this.productName = this.product.name;
        this.currentOptionModel = this.currentOptionModel || this.product.optionModel;

        this.productType = getProductType(this.product);

        this.rating = getRating(this.id);

        this.promotions = this.apiPromotions ? getPromotions(this.apiPromotions) : null;
        this.attributes = getAttributes(this.product);
    },

    /**
     * Normalize product and return Product variation model
     * @param  {dw.catalog.Product} product - Product instance returned from the API
     * @param  {Object} productVariables - variables passed in the query string to
     *                                     target product variation group
     * @return {dw.catalog.ProductVarationModel} Normalized variation model
     */
    getVariationModel: function (product, productVariables) {
        return getVariationModel(product, productVariables);
        return {};
    },

    initVariationAttributes: function initVariationAttributes() {
        var selectedOptionsQueryParams = productHelper.getSelectedOptionsUrl(this.currentOptionModel);

        var result = this.variationModel
            ? (new VariationAttributesModel(
                this.variationModel,
                this.variationAttributeConfig,
                selectedOptionsQueryParams,
                this.quantity)).slice(0)
            : null;
        return result;
    },

    initAvailability: function initAvailability() {
        return getProductAvailability(this.quantity, this.product);
    },

    initPrice: function initPrice() {
         // alternatively one could use
         // priceFactory.getTilePrice(getBaseSearch(this.product), this.product, null, this.apiPromotions);
         return priceFactory.getPrice(this.product, null, this.useSimplePrice, this.apiPromotions, this.currentOptionModel);
    },

    /**
     * Gets all swatches for this product
     * @param  {dw.catalog.Product} product - Product instance returned from the API
     * @return {Array} List of swatches
     */
    initSwatches: function initSwatches() {
        var varmodel = this.product.variationModel;
        var swatches = [];

    	var colorAttribute = varmodel.getProductVariationAttribute('color');

        if (colorAttribute) {
        	var colors = varmodel.getAllValues(colorAttribute);
        	for (var i = 0; i < colors.length; i++) {
        		var apiImage = colors[i].getImage('swatch', 0);
        		var item = {};

        		item.imageUrl = apiImage.URL;
        		item.imageAlt = apiImage.alt;

        		item.productUrl = varmodel.url('Product-Show', 'color', colors[i].ID).toString();
        		swatches.push(item);
        	}
        }
        return swatches;
    },
    
	/**
     * Gets all swatches for this product
     * @param  {dw.catalog.Product} product - Product instance returned from the API
     * @return {Array} List of swatches
     */
    initSwatchesSearch: function initSwatches() {
        var varmodel = this.product.variationModel;
        var swatches = [];

    	var hit = getBaseSearch(this.product);

        if (hit) {
        	var colors = hit.getRepresentedVariationValues('color');
        	for (var i = 0; i < colors.length; i++) {
        		var apiImage = colors[i].getImage('swatch', 0);
        		var item = {};

        		item.imageUrl = apiImage.URL;
        		item.imageAlt = apiImage.alt;

        		item.productUrl = varmodel.url('Product-Show', 'color', colors[i].ID).toString();
        		swatches.push(item);
        	}
        }
        return swatches;
    },

    /**
     * Gets tile image for this product
     * @param  {dw.catalog.Product} product - Product instance returned from the API
     * @return {Array} List of swatches
     */
    initTileImage: function initTileImage() {
        var apiImage = this.product.getImage('medium', 0);
    	var item = {};

        item.imageUrl = apiImage.getURL().toString();
        item.imageTitle = apiImage.title;

        return item;
    },

    /**
     * Gets tile image for this product
     * @param  {dw.catalog.Product} product - Product instance returned from the API
     * @return {Array} List of swatches
     */
    initImages: function initImages() {
        return this.variationModel
            ? new ImageModel(this.variationModel, this.imageConfig)
            : new ImageModel(this.product, this.imageConfig);
    }

};

/**
 * @constructor
 * @classdesc Base product class. Used for product tiles
 * @param {dw.catalog.Product} product - Product instance returned from the API
 * @param {Object} productVariables - variables passed in the query string to
 *                                    target product variation group
 * @param {dw.util.Collection.<dw.campaign.Promotion>} promotions - Collection of applicable
 *                                                                  Promotions
 */
function ProductWrapper(product, productVariables, promotions) {
    var productBase = new ProductBase(product, productVariables, null, promotions);
    var items = [
        'id',
        'productName',
        'price',
        'productType',
        'tileImage',
        'rating',
        'swatches',
        'promotions',
        'attributes'
    ];

    items.forEach(function (item) {
        var initFunction = 'init' + item.charAt(0).toUpperCase() + item.slice(1);
        this[item] = (initFunction in productBase) ? productBase[initFunction]() : productBase[item];
    }, this);
}

module.exports = ProductWrapper;
module.exports.productBase = ProductBase;
module.exports.getProductType = getProductType;
module.exports.getVariationModel = getVariationModel;
module.exports.getProductAvailability = getProductAvailability;

'use strict';

module.exports = {
    availability: require('*/cartridge/models/product/decorators/availability'),
    description: require('*/cartridge/models/product/decorators/description'),
    images: require('*/cartridge/models/product/decorators/images'),
    price: require('*/cartridge/models/product/decorators/price'),
    searchPrice: require('*/cartridge/models/product/decorators/searchPrice'),
    promotions: require('*/cartridge/models/product/decorators/promotions'),
    quantity: require('*/cartridge/models/product/decorators/quantity'),
    quantitySelector: require('*/cartridge/models/product/decorators/quantitySelector'),
    ratings: require('*/cartridge/models/product/decorators/ratings'),
    sizeChart: require('*/cartridge/models/product/decorators/sizeChart'),
    variationAttributes: require('*/cartridge/models/product/decorators/variationAttributes'),
    searchVariationAttributes: require('*/cartridge/models/product/decorators/searchVariationAttributes'),
    attributes: require('*/cartridge/models/product/decorators/attributes'),
    options: require('*/cartridge/models/product/decorators/options'),
    currentUrl: require('*/cartridge/models/product/decorators/currentUrl')
};

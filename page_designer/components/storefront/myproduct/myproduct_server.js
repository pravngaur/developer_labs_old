'use strict';

var Template = require( 'dw/util/Template' );
var HashMap = require( 'dw/util/HashMap' );
var URLUtils = require( 'dw/web/URLUtils' );
var ProductFactory = require('*/cartridge/scripts/factories/product');

/**
 * Render logic for the storefront.myproduct.
 */
module.exports.render = function (context) {
    var content = context.content;
    var model = new HashMap();
    var product = content.product;

    if (product) {
        model.url = URLUtils.url( 'Product-Show', 'pid', product.ID );
    }

    if (product) {
        var images = product.getImages( 'large' );
        var productImage = images.iterator().next();
        if (productImage) {
            model.image = {
                src: productImage.getAbsURL(),
                alt: productImage.getAlt()
            };
        }
    }

    return new Template( 'experience/components/storefront/myproduct' ).render( model ).text;
};

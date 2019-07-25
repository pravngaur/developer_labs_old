'use strict';

var Template = require( 'dw/util/Template' );
var HashMap = require( 'dw/util/HashMap' );

/**
 * Render logic for the assets.sizetest.
 */
module.exports.render = function (context) {

    var model = new HashMap();
    var content = context.content;

    model.attribute1 = content.attribute1;

    return new Template( 'experience/components/sizing/sizetest' ).render( model ).text;
};

'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for dynamic columns.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    var desktopColumns = parseInt( context.content.desktopColumns, 10);
    var phoneColumns = parseInt( context.content.phoneColumns, 10);

    // var xsColSize = 12 / parseInt(context.content.xsCarouselSlidesToDisplay, 10);
    var smColSize = parseInt(12 / phoneColumns, 10);
    var mdColSize =  parseInt(12 / desktopColumns, 10);

    var sizeExtraSmall = ' col-' + smColSize;
    var sizeSmall = ' col-sm-' + smColSize;
    var sizeMedium = ' col-md-' + mdColSize;

    model.regions.containers.setClassName('row');
    model.regions.containers.setComponentClassName(sizeExtraSmall + sizeSmall + sizeMedium);

    return new Template( 'experience/components/rowsandcolumns/dynamiccolumns' ).render( model ).text;
};

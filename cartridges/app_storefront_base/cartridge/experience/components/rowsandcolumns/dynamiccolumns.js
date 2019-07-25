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



/*
    -- DXP LAYOUT Notes ---------------------------

    1 Visual Icons for column choice (12 column system slds)

    2 Drag slider or "percentages" for column sizing (e.g. 20x80 40x60 etc)
        - uses 12 column system instead of percent

    3 Theme level settings
        different colors
        links

    4 Theme Picker


    5 Reality - DXP has same issue of too many components from too many sources, developers etc...
        So provide ability to adjust small things like sizing spacing fonts etc...
        Minute 26:45 in DXP recording https://drive.google.com/file/d/1M1btAMyPcjZczXWO-MZMSeGStJKmjt_u/view





 */

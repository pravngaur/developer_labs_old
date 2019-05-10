'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');

/**
 * Render logic for the mylayout.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    var metaDefinition = require('~/cartridge/experience/components/layouts/mylayout.json');
    model.regions = new RegionModelRegistry(component, metaDefinition);

    return new Template('experience/components/layouts/mylayout').render(model).text;
};

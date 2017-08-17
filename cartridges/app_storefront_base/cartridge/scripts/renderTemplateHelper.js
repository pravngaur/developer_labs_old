'use strict';

var HashMap = require('dw/util/HashMap');
var Template = require('dw/util/Template');

/**
 * maps the given object into a HashMap
 * @param {Object} objectContext - object to be mapped
 * @returns {dw.util.HashMap}
 */
function getMappedObject(objectContext) {
    var context = new HashMap();

    Object.keys(objectContext).forEach(function (key) {
        context.put(key, objectContext[key]);
    });

    return context;
}

/**
 * gets the render html for the given isml template
 * @param {Object|dw.util.HashMap} templateContext - object that will fill template placeholders
 * @param {string} templateName - the name of the isml template to render.
 * @returns {string} the rendered isml.
 */
function getRenderedHtml(templateContext, templateName) {
    var context;
    if (!(templateContext instanceof require('dw/util/HashMap'))) {
        context = getMappedObject(templateContext);
    } else {
        context = templateContext;
    }

    var template = new Template(templateName);
    return template.render(context).text;
}

module.exports = {
    getMappedObject: getMappedObject,
    getRenderedHtml: getRenderedHtml
};

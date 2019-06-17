'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var Categories = require('*/cartridge/models/categories');
var ArrayList = require('dw/util/ArrayList');

/**
 * Render logic for the assets.category.
 *
 * @param {dw.experience.PageScriptContext}
 *            context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;
    model.textHeadline = content.textHeadline;
    var categoriesToBeDisplayed = new ArrayList();

    for (var i = 1; i <= 12; i++) {
        var cat = content['category' + i];
        if (cat) {
            categoriesToBeDisplayed.push(cat);
        }
    }

    var categories = new Categories(categoriesToBeDisplayed);
    model.categories = categories.categories;
    return new Template('experience/components/storefront/category').render(model).text;
};

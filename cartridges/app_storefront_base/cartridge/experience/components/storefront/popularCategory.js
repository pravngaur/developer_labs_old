'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for the storefront.popularCategories.
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

    var catObj = {};
    var cat = content.category;
    if (cat) {
        catObj.ID = cat.ID;
        catObj.compID = context.component.ID;

        if (content.catDisplayName) {
            catObj.name = content.catDisplayName;
        } else {
            catObj.name = cat.displayName;
        }

        if (cat.custom.slotBannerImage) {
            catObj.imageURL = cat.custom.slotBannerImage.getURL().toString();
        }

        if (cat.image) {
            catObj.imageURL = cat.image.getURL().toString();
        }

        if (content.offset) {
            catObj.offset = content.offset;
        }

        if (content.imagesize) {
            catObj.imagesize = content.imagesize;
        }

        if (content.image) {
            var mobileImageTransformation = ImageTransformation.scale(content.image.metaData, 'mobile');
            var tabletImageTransformation = ImageTransformation.scale(content.image.metaData, 'tablet');
            var desktopImageTransformation = ImageTransformation.scale(content.image.metaData, 'desktop');
            model.image = {
                src: {
                    mobile: ImageTransformation.url(content.image.file, mobileImageTransformation),
                    tablet: ImageTransformation.url(content.image.file, tabletImageTransformation),
                    desktop: ImageTransformation.url(content.image.file, desktopImageTransformation)
                },
                alt: content.image.file.getAlt(),
                focalPointX: (content.image.focalPoint.x * 100) + '%',
                focalPointY: (content.image.focalPoint.y * 100) + '%'
            };
            catObj.imageURL = null;
        } else {
            content.image = null;
        }

        catObj.url = cat.custom && 'alternativeUrl' in cat.custom && cat.custom.alternativeUrl
            ? cat.custom.alternativeUrl
            : URLUtils.url('Search-Show', 'cgid', cat.getID()).toString();
    }

    model.category = catObj;
    return new Template('experience/components/storefront/popularCategory').render(model).text;
};

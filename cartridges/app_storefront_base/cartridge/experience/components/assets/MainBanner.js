'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var URLUtils = require('dw/web/URLUtils');
var ImageTransformation = require('*/cartridge/experience/utilities/ImageTransformation.js');

/**
 * Render logic for Main Banner.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var content = context.content;

    var mobileImageTransformation = ImageTransformation.scale(content.image.metaData, 'mobile');
    var tabletImageTransformation = ImageTransformation.scale(content.image.metaData, 'tablet');
    var desktopImageTransformation = ImageTransformation.scale(content.image.metaData, 'desktop');

    model.heading = content.heading;
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
    model.link = content.categoryLink ? content.categoryLink : '#';
    return new Template('experience/components/assets/mainBanner').render(model).text;
};

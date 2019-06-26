'use strict';

var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');

/**
 * Render logic for carousel layout.
 * @param {dw.experience.PageScriptContext} context The page script context object.
 * @returns {string} template to be displayed
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var component = context.component;

    // automatically register configured regions
    model.regions = PageRenderHelper.getRegionModelRegistry(component);

    var xsColSize = 12 / parseInt(context.content.xsCarouselSlidesToDisplay, 10);
    var smColSize = 12 / parseInt(context.content.smCarouselSlidesToDisplay, 10);
    var mdColSize = 12 / parseInt(context.content.mdCarouselSlidesToDisplay, 10);

    var sizeExtraSmall = ' col-' + xsColSize;
    var sizeSmall = ' col-sm-' + smColSize;
    var sizeMedium = ' col-md-' + mdColSize;

    model.regions.slides.setClassName('carousel-inner row');
    model.regions.slides.setComponentClassName('carousel-item' + sizeExtraSmall + sizeSmall + sizeMedium);
    model.regions.slides.setComponentClassName('carousel-item active' + sizeExtraSmall + sizeSmall + sizeMedium, { position: 0 });

    var numberOfSlides = model.regions.slides.region.size;

    for (var i = 0; i < numberOfSlides; i++) {
        model.regions.slides.setComponentAttribute('data-position', i, { position: i });
    }

    model.id = 'carousel-' + context.component.getID();

    model.slidesToDisplay = {
        xs: context.content.xsCarouselSlidesToDisplay,
        sm: context.content.smCarouselSlidesToDisplay,
        md: context.content.mdCarouselSlidesToDisplay
    };

    model.displayIndicators = {
        xs: context.content.xsCarouselIndicators ? 'indicators-xs' : '',
        sm: context.content.smCarouselIndicators ? 'indicators-sm' : '',
        md: context.content.mdCarouselIndicators ? 'indicators-md' : ''
    };

    model.displayControls = {
        xs: context.content.xsCarouselControls ? 'controls-xs' : '',
        sm: context.content.smCarouselControls ? 'controls-sm' : '',
        md: 'controls-md'
    };

    model.insufficientNumberOfSlides = {
        xs: context.content.xsCarouselSlidesToDisplay >= numberOfSlides ? 'insufficient-xs-slides' : '',
        sm: context.content.smCarouselSlidesToDisplay >= numberOfSlides ? 'insufficient-sm-slides' : '',
        md: context.content.mdCarouselSlidesToDisplay >= numberOfSlides ? 'insufficient-md-slides' : ''
    };

    model.numberOfSlides = model.regions.slides.region.size;

    model.title = context.content.textHeadline;

    return new Template('experience/components/storefront/carousel').render(model).text;
};

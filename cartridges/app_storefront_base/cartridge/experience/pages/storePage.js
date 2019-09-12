'use strict';
var Template = require('dw/util/Template');
var HashMap = require('dw/util/HashMap');
var PageRenderHelper = require('*/cartridge/experience/utilities/PageRenderHelper.js');
var RegionModelRegistry = require('*/cartridge/experience/utilities/RegionModelRegistry.js');

/**
 * Render logic for the storepage.
 *
 * @param {dw.experience.PageScriptContext} context The page script context object.
 *
 * @returns {string} The template text
 */
module.exports.render = function (context) {
    var model = new HashMap();
    var page = context.page;
    model.page = page;

    // automatically register configured regions
    var metaDefinition = require('*/cartridge/experience/pages/storePage.json');
    model.regions = new RegionModelRegistry(page, metaDefinition);

    // Determine seo meta data.
    // Used in htmlHead.isml via common/layout/page.isml decorator.
    model.CurrentPageMetaData = PageRenderHelper.getPageMetaData(page);
    model.CurrentPageMetaData = {};
    model.CurrentPageMetaData.title = page.pageTitle;
    model.CurrentPageMetaData.description = page.pageDescription;
    model.CurrentPageMetaData.keywords = page.pageKeywords;

    if (PageRenderHelper.isInEditMode()) {
        var HookManager = require('dw/system/HookMgr');
        HookManager.callHook('app.experience.editmode', 'editmode');
        model.resetEditPDMode = true;
    }

    // GET CACHE FROM CUSTOM ATTRIBUTE
    var Site = require('dw/system/Site');
    var pdStorePageCacheDuration = Site.getCurrent().getCustomPreferenceValue('page_designer_cache_attr_jason');

    if (!pdStorePageCacheDuration) {
        pdStorePageCacheDuration = 60;
    }

    var expiryTime = new Date(Date.now());
    //expiryTime.setMinutes(expiryTime.getMinutes() + 60);
    expiryTime.setMinutes(expiryTime.getMinutes() + pdStorePageCacheDuration);
    response.setExpires(expiryTime);

    // render the page
    return new Template('experience/pages/storePage').render(model).text;
};

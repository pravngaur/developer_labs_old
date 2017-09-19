/**
 *	forces a refresh of the session cache
 */
function refresh() {
    var PromotionMgr = require('dw/campaign/PromotionMgr');
    var activePromotions = PromotionMgr.activeCustomerPromotions.getProductPromotions().toArray();
    var promoIDs = activePromotions.map(function (element) { return element.ID; });

    session.privacy.shouldBeInThePlatform = JSON.stringify(promoIDs); // eslint-disable-line no-undef
}


exports.get = function () {
    if (!session.privacy.shouldBeInThePlatform) { // eslint-disable-line no-undef
        refresh();
    }

    return JSON.parse(session.privacy.shouldBeInThePlatform); // eslint-disable-line no-undef
};
exports.refresh = refresh;

'use strict';

var HashMap = require('dw/util/HashMap');
var OrderMgr = require('dw/order/OrderMgr');
var Order = require('dw/order/Order');
var HookMgr = require('dw/system/HookMgr');
var Site = require('dw/system/Site');
var Template = require('dw/util/Template');
var Resource = require('dw/web/Resource');
var URLUtils = require('dw/web/URLUtils');

var OrderModel = require('*/cartridge/models/order');

/**
* Returns a list of orders for the current customer
* @param {Object} currentCustomer - object with customer properties
* @param {Object} querystring - querystring properties
* @returns {Object} - orderModel of the current dw order object
* */
function getOrders(currentCustomer, querystring) {
    // get all orders for this user
    var customerNo = currentCustomer.profile.customerNo;
    var customerOrders = OrderMgr.searchOrders(
        'customerNo={0} AND status!={1}',
        'creationDate desc',
        customerNo,
        Order.ORDER_STATUS_REPLACED
    );

    var orders = [];

    var filterValues = [
        {
            displayValue: Resource.msg('orderhistory.sixmonths.option', 'order', null),
            optionValue: URLUtils.url('Order-Filtered', 'orderFilter', '6').abs().toString()
        },
        {
            displayValue: Resource.msg('orderhistory.twelvemonths.option', 'order', null),
            optionValue: URLUtils.url('Order-Filtered', 'orderFilter', '12').abs().toString()
        }
    ];
    var orderYear;
    var years = [];
    var customerOrder;
    var SIX_MONTHS_AGO = Date.now() - 15778476000;
    var YEAR_AGO = Date.now() - 31556952000;
    var orderModel;

    while (customerOrders.hasNext()) {
        customerOrder = customerOrders.next();
        var config = {
            numberOfLineItems: 'single'
        };

        orderYear = customerOrder.getCreationDate().getFullYear().toString();
        var orderTime = customerOrder.getCreationDate().getTime();

        if (years.indexOf(orderYear) === -1) {
            var optionURL =
                URLUtils.url('Order-Filtered', 'orderFilter', orderYear).abs().toString();
            filterValues.push({
                displayValue: orderYear,
                optionValue: optionURL
            });
            years.push(orderYear);
        }

        if (querystring.orderFilter
            && querystring.orderFilter !== '12'
            && querystring.orderFilter !== '6') {
            if (orderYear === querystring.orderFilter) {
                orderModel = new OrderModel(customerOrder, { config: config });
                orders.push(orderModel);
            }
        } else if (querystring.orderFilter
            && YEAR_AGO < orderTime
            && querystring.orderFilter === '12') {
            orderModel = new OrderModel(customerOrder, { config: config });
            orders.push(orderModel);
        } else if (SIX_MONTHS_AGO < orderTime) {
            orderModel = new OrderModel(customerOrder, { config: config });
            orders.push(orderModel);
        }
    }

    return {
        orders: orders,
        filterValues: filterValues
    };
}

/**
 * Sends a confirmation email to the newly registered user
 * @param {Object} registeredUser - The newly registered user
 * @returns {void}
 */
function sendConfirmationEmail(registeredUser) {
    var context = new HashMap();
    var templateName = 'checkout/confirmation/accountRegisteredEmail';
    var template;
    var content;

    var userObject = {
        email: registeredUser.email,
        firstName: registeredUser.firstName,
        lastName: registeredUser.lastName,
        url: URLUtils.https('Login-Show')
    };

    // These context items are added to help keep compatibility with SG
    context.CurrentForms = session.forms;
    context.CurrentHttpParameterMap = request.httpParameterMap;
    context.CurrentCustomer = customer;

    Object.keys(userObject).forEach(function (key) {
        context.put(key, userObject[key]);
    });

    template = new Template(templateName);
    content = template.render(context).text;

    var hookID = 'app.mail.sendMail';
    if (HookMgr.hasHook(hookID)) {
        // expects a Status object returned from the hook call
        HookMgr.callHook(
            hookID,
            'sendMail',
            {
                template: templateName,
                fromEmail: Site.current.getCustomPreferenceValue('customerServiceEmail') || 'no-reply@salesforce.com',
                toEmail: userObject.email,
                subject: Resource.msg('email.subject.new.registration', 'registration', null),
                messageBody: content,
                params: context
            }
        );
    } else {
        require('dw/system/Logger').error('No hook registered for {0}', hookID);
    }
}

module.exports = {
    getOrders: getOrders,
    sendConfirmationEmail: sendConfirmationEmail
};

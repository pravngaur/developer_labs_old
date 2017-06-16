'use strict';
var addressHelpers = require('./addressHelpers');

/**
 * updates the shipping address selector within shipping forms
 * @param {Object} productLineItem - the productLineItem model
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order model
 * @param {Object} customer - the customer model
 */
function updateShippingAddressSelector(productLineItem, shipping, order, customer) {
    var uuidEl = $('input[value=' + productLineItem.UUID + ']');
    var shippings = order.shipping;

    var form;
    var $shippingAddressSelector;
    var hasSelectedAddress = false;

    if (uuidEl && uuidEl.length > 0) {
        form = uuidEl[0].form;
        $shippingAddressSelector = $('.addressSelector', form);
    }

    if ($shippingAddressSelector && $shippingAddressSelector.length === 1) {
        $shippingAddressSelector.empty();
        // Add New Address option
        $shippingAddressSelector.append(addressHelpers.optionValueForAddress(null, false, order));
        // Separator -
        $shippingAddressSelector.append(addressHelpers.optionValueForAddress(
            order.resources.shippingAddresses, false, order, { className: 'multi-shipping' }
        ));
        shippings.forEach(function (aShipping) {
            var isSelected = shipping.UUID === aShipping.UUID;
            hasSelectedAddress = hasSelectedAddress || isSelected;
            $shippingAddressSelector.append(
                addressHelpers.optionValueForAddress(aShipping, isSelected, order,
                    { className: 'multi-shipping' }
                )
            );
        });
        if (customer.addresses && customer.addresses.length > 0) {
            $shippingAddressSelector.append(addressHelpers.optionValueForAddress(
                order.resources.accountAddresses, false, order));
            customer.addresses.forEach(function (address) {
                var isSelected = shipping.matchingAddressId === address.ID;
                $shippingAddressSelector.append(
                    addressHelpers.optionValueForAddress({
                        UUID: 'ab_' + address.ID,
                        shippingAddress: address
                    }, isSelected, order)
                );
            });
        }
    }

    if (!hasSelectedAddress) {
        // show
        $(form).addClass('hide-details');
    } else {
        $(form).removeClass('hide-details');
    }
}

/**
 * updates the shipping address form values within shipping forms
 * @param {Object} shipping - the shipping (shipment model) model
 */
function updateShippingAddressFormValues(shipping) {
    if (!shipping.shippingAddress) return;

    $('input[value=' + shipping.UUID + ']').each(function (formIndex, el) {
        var form = el.form;
        if (!form) return;

        $('input[name$=_firstName]', form).val(shipping.shippingAddress.firstName);
        $('input[name$=_lastName]', form).val(shipping.shippingAddress.lastName);
        $('input[name$=_address1]', form).val(shipping.shippingAddress.address1);
        $('input[name$=_address2]', form).val(shipping.shippingAddress.address2);
        $('input[name$=_city]', form).val(shipping.shippingAddress.city);
        $('input[name$=_postalCode]', form).val(shipping.shippingAddress.postalCode);
        $('select[name$=_stateCode]', form).val(shipping.shippingAddress.stateCode);
        $('select[name$=_countryCode]', form).val(shipping.shippingAddress.countryCode);
        $('input[name$=_phone]', form).val(shipping.shippingAddress.phone);
    });
}

/**
 * updates the shipping method radio buttons within shipping forms
 * @param {Object} shipping - the shipping (shipment model) model
 */
function updateShippingMethods(shipping) {
    var uuidEl = $('input[value=' + shipping.UUID + ']');
    if (uuidEl && uuidEl.length > 0) {
        $.each(uuidEl, function (shipmentIndex, el) {
            var form = el.form;
            if (!form) return;

            var $shippingMethodList = $('.shipping-method-list', form);

            if ($shippingMethodList && $shippingMethodList.length > 0) {
                $shippingMethodList.empty();

                var shippingMethods = shipping.applicableShippingMethods;
                var shippingMethodFormID = form.name + '_shippingAddress_shippingMethodID';
                var selected = shipping.selectedShippingMethod || {};

                //
                // Create the new rows for each shipping method
                //
                $.each(shippingMethods, function (methodIndex, shippingMethod) {
                    var tmpl = $('#shipping-method-template').clone();
                    // set input
                    $('input', tmpl)
                        .prop('id', 'shippingMethod-' + shippingMethod.ID)
                        .prop('name', shippingMethodFormID)
                        .prop('value', shippingMethod.ID)
                        .attr('checked', shippingMethod.ID === selected.ID);

                    // set shipping method name
                    $('.display-name', tmpl).text(shippingMethod.displayName);

                    // set or hide arrival time
                    if (shippingMethod.estimatedArrivalTime) {
                        $('.arrival-time', tmpl)
                            .text('(' + shippingMethod.estimatedArrivalTime + ')')
                            .show();
                    }

                    // set shipping cost
                    $('.shipping-cost', tmpl).text(shippingMethod.shippingCost);

                    $shippingMethodList.append(tmpl.html());
                });
            }
        });
    }
}

/**
 * updates the order shipping summary for an order shipment model
 * @param {Object} shipping - the shipping (shipment model) model
 */
function updateShippingSummaryInformation(shipping) {
    $('[data-shipment-summary=' + shipping.UUID + ']').each(function (i, el) {
        var $container = $(el);
        var $addressContainer = $container.find('.address-summary');
        var $shippingPhone = $container.find('.shipping-phone');
        var $methodTitle = $container.find('.shipping-method-title');
        var $methodArrivalTime = $container.find('.shipping-method-arrival-time');
        var $methodPrice = $container.find('.shipping-method-price');

        var address = shipping.shippingAddress;
        var selectedShippingMethod = shipping.selectedShippingMethod;

        addressHelpers.populateAddressSummary($addressContainer, address);

        if (address && address.phone) {
            $shippingPhone.text(address.phone);
        }

        if (selectedShippingMethod) {
            $methodTitle.text(selectedShippingMethod.displayName);
            if (selectedShippingMethod.estimatedArrivalTime) {
                $methodArrivalTime.text(
                    '( ' + selectedShippingMethod.estimatedArrivalTime + ' )'
                );
            } else {
                $methodArrivalTime.empty();
            }
            $methodPrice.text(selectedShippingMethod.shippingCost);
        }
    });
}

/**
 * Update the read-only portion of the shipment display (per PLI)
 * @param {Object} productLineItem - the productLineItem model
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order model
 * @param {Object} [options] - options for updating PLI summary info
 * @param {Object} [options.keepOpen] - if true, prevent changing PLI view mode to 'view'
 */
function updatePLIShippingSummaryInformation(productLineItem, shipping, order, options) {
    var keepOpen = options && options.keepOpen;

    var $pli = $('input[value=' + productLineItem.UUID + ']');
    var form = $pli && $pli.length > 0 ? $pli[0].form : null;

    if (!form) return;

    var $viewBlock = $('.view-address-block', form);

    var hasAddress = !!shipping.shippingAddress;
    var address = shipping.shippingAddress || {};
    var selectedMethod = shipping.selectedShippingMethod;

    var nameLine = address.firstName ? address.firstName + ' ' : '';
    if (address.lastName) nameLine += address.lastName;

    var address1Line = address.address1;
    var address2Line = address.address2;

    var phoneLine = address.phone;

    var shippingCost = selectedMethod ? selectedMethod.shippingCost : '';
    var methodNameLine = selectedMethod ? selectedMethod.displayName : '';
    var methodArrivalTime = selectedMethod && selectedMethod.estimatedArrivalTime
        ? '(' + selectedMethod.estimatedArrivalTime + ')'
        : '';

    var tmpl = $('#pli-shipping-summary-template').clone();

    $('.ship-to-name', tmpl).text(nameLine);
    $('.ship-to-address1', tmpl).text(address1Line);
    $('.ship-to-address2', tmpl).text(address2Line);
    $('.ship-to-city', tmpl).text(address.city);
    if (address.stateCode) {
        $('.ship-to-st', tmpl).text(address.stateCode);
    }
    $('.ship-to-zip', tmpl).text(address.postalCode);
    $('.ship-to-phone', tmpl).text(phoneLine);

    if (!address2Line) {
        $('.ship-to-address2', tmpl).hide();
    }

    if (!phoneLine) {
        $('.ship-to-phone', tmpl).hide();
    }

    if (shipping.selectedShippingMethod) {
        $('.display-name', tmpl).text(methodNameLine);
        $('.arrival-time', tmpl).text(methodArrivalTime);
        $('.price', tmpl).text(shippingCost);
    }

    $viewBlock.html(tmpl.html());

    if (!keepOpen) {
        if (hasAddress) {
            $viewBlock.parents('[data-view-mode]').attr('data-view-mode', 'view');
        } else {
            $viewBlock.parents('[data-view-mode]').attr('data-view-mode', 'enter');
        }
    }
}

/**
 * Update the hidden form values that associate shipping info with product line items
 * @param {Object} productLineItem - the productLineItem model
 * @param {Object} shipping - the shipping (shipment model) model
 */
function updateProductLineItemShipmentUUIDs(productLineItem, shipping) {
    $('input[value=' + productLineItem.UUID + ']').each(function (key, pli) {
        var form = pli.form;
        $('[name=shipmentUUID]', form).val(shipping.UUID);
        $('[name=originalShipmentUUID]', form).val(shipping.UUID);
    });
}

/**
 * Update the shipping UI for a single shipping info (shipment model)
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order/basket model
 * @param {Object} customer - the customer model
 * @param {Object} [options] - options for updating PLI summary info
 * @param {Object} [options.keepOpen] - if true, prevent changing PLI view mode to 'view'
 */
function updateShippingInformation(shipping, order, customer, options) {
    // First copy over shipmentUUIDs from response, to each PLI form
    order.shipping.forEach(function (aShipping) {
        aShipping.productLineItems.items.forEach(function (productLineItem) {
            updateProductLineItemShipmentUUIDs(productLineItem, aShipping);
        });
    });

    // Now update shipping information, based on those associations
    updateShippingMethods(shipping);
    updateShippingAddressFormValues(shipping);
    updateShippingSummaryInformation(shipping, order);

    // And update the PLI-based summary information as well
    shipping.productLineItems.items.forEach(function (productLineItem) {
        updateShippingAddressSelector(productLineItem, shipping, order, customer);
        updatePLIShippingSummaryInformation(productLineItem, shipping, order, options);
    });
}

/**
 * Update the checkout state (single vs. multi-ship) via Session.privacy cache
 * @param {Object} order - checkout model to use as basis of new truth
 */
function updateMultiShipInformation(order) {
    var $checkoutMain = $('#checkout-main');
    var $checkbox = $('[name=usingMultiShipping]');
    var $submitShippingBtn = $('button.submit-shipping');

    if (order.usingMultiShipping) {
        $checkoutMain.addClass('multi-ship');
        $checkbox.prop('checked', true);
    } else {
        $checkoutMain.removeClass('multi-ship');
        $checkbox.prop('checked', null);
        $submitShippingBtn.prop('disabled', null);
    }
}

// /**
//  * Handle response from the server for valid or invalid form fields.
//  * @param {Object} defer - the deferred object which will resolve on success or reject.
//  * @param {Object} data - the response data with the invalid form fields or
//  *  valid model data.
//  */
// function shippingFormResponse(defer, data) {
//     var isMultiShip = $('#checkout-main').hasClass('multi-ship');
//     var formSelector = isMultiShip ?
//         '.multi-shipping .active form' : '.single-shipping .active form';
//
//     // highlight fields with errors
//     if (data.error) {
//         if (data.fieldErrors.length) {
//             data.fieldErrors.forEach(function (error) {
//                 if (Object.keys(error).length) {
//                     loadFormErrors(formSelector, error);
//                 }
//             });
//             defer.reject(data);
//         }
//
//         if (data.cartError) {
//             window.location.href = data.redirectUrl;
//             defer.reject();
//         }
//     } else {
//         //
//         // Populate the Address Summary
//         //
//         updateCheckoutView(data.order, data.customer);
//
//         defer.resolve(data);
//     }
// }

module.exports = {
    updateShippingAddressSelector: updateShippingAddressSelector,
    updateShippingAddressFormValues: updateShippingAddressFormValues,
    updateShippingMethods: updateShippingMethods,
    updateShippingSummaryInformation: updateShippingSummaryInformation,
    updatePLIShippingSummaryInformation: updatePLIShippingSummaryInformation,
    updateProductLineItemShipmentUUIDs: updateProductLineItemShipmentUUIDs,
    updateShippingInformation: updateShippingInformation,
    updateMultiShipInformation: updateMultiShipInformation
    // shippingFormResponse: shippingFormResponse
};

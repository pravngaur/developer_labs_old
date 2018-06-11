'use strict';

var addressHelpers = require('./address');
var formHelpers = require('./formErrors');

/**
 * updates the shipping address selector within shipping forms
 * @param {Object} productLineItem - the productLineItem model
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order model
 * @param {Object} addressSelector - the addressSelector model
 */
function updateShippingAddressSelector(productLineItem, shipping, order, addressSelector) {
    if (addressSelector) {
        $('body').trigger('checkout:updateAddressSelectors', {
            addressSelector: addressSelector,
            order: order,
            shipping: shipping
        });
    }
//    var uuidEl = $('input[value=' + productLineItem.UUID + ']');
//    var shippings = addressSelector.addresses.shipmentAddresses;
//    var customerAddresses = addressSelector.addresses.customerAddresses;
//    var isCustomerAddress = false;
//
//    var form;
//    var $shippingAddressSelector;
//    var hasSelectedAddress = false;
//
//    if (uuidEl && uuidEl.length > 0) {
//        form = uuidEl[0].form;
//        $shippingAddressSelector = $('.addressSelector', form);
//    }
//
//    if ($shippingAddressSelector && $shippingAddressSelector.length === 1) {
//        $shippingAddressSelector.empty();
//
//        // Add New Address option
//        $shippingAddressSelector.append(addressHelpers.methods.optionValueForAddress(
//            null,
//            false,
//            order));
//
//        // Separator -
//        $shippingAddressSelector.append(addressHelpers.methods.optionValueForAddress(
//            order.resources.shippingAddresses, false, order, { className: 'multi-shipping' }
//        ));
//
//        shippings.forEach(function (aShipping) {
//            isCustomerAddress = aShipping.selectedCustomerAddressUUID || false;
//            var isSelected = !isCustomerAddress && shipping.UUID === aShipping.UUID;
//            hasSelectedAddress = hasSelectedAddress || isSelected;
//
//            var addressOption = addressHelpers.methods.optionValueForAddress(
//                aShipping,
//                isSelected,
//                order,
//                { className: 'multi-shipping' }
//            );
//
//            var newAddress = addressOption.html() === order.resources.addNewAddress;
//            var matchingUUID = aShipping.UUID === shipping.UUID;
//            if ((newAddress && matchingUUID) || (!newAddress && matchingUUID) || (!newAddress && !matchingUUID)) {
//                $shippingAddressSelector.append(addressOption);
//            }
//            if (newAddress && !matchingUUID) {
//                $(addressOption[0]).remove();
//            }
//        });
//
//        if (customerAddresses && customerAddresses.length > 0) {
//            $shippingAddressSelector.append(addressHelpers.methods.optionValueForAddress(
//                order.resources.accountAddresses, false, order));
//            customerAddresses.forEach(function (customerAddress) {
//                var isSelected = isCustomerAddress && isCustomerAddress === customerAddress.UUID;
//                $shippingAddressSelector.append(
//                    addressHelpers.methods.optionValueForAddress({
//                        UUID: 'ab_' + customerAddress.address.ID,
//                        address: customerAddress.address
//                    }, isSelected, order)
//                );
//            });
//        }
//    }
//
//    if (!hasSelectedAddress) {
//        // show
//        $(form).addClass('hide-details');
//    } else {
//        $(form).removeClass('hide-details');
//    }
//
//    $('body').trigger('shipping:updateShippingAddressSelector', {
//        productLineItem: productLineItem,
//        shipping: shipping,
//        order: order,
//        addressSelector: addressSelector
//    });
}

/**
 * updates the shipping address form values within shipping forms
 * @param {Object} shipping - the shipping (shipment model) model
 */
function updateShippingAddressFormValues(shipping) {
    var addressObject = Object.assign({}, shipping.shippingAddress);

    if (!addressObject) {
        addressObject = {
            firstName: null,
            lastName: null,
            address1: null,
            address2: null,
            city: null,
            postalCode: null,
            stateCode: null,
            countryCode: null,
            phone: null
        };
    }

    $('input[value=' + shipping.UUID + ']').each(function (formIndex, el) {
        var form = el.form;
        if (!form) return;
        var countryCode = addressObject.countryCode;

        $('input[name$=_firstName]', form).val(addressObject.firstName);
        $('input[name$=_lastName]', form).val(addressObject.lastName);
        $('input[name$=_address1]', form).val(addressObject.address1);
        $('input[name$=_address2]', form).val(addressObject.address2);
        $('input[name$=_city]', form).val(addressObject.city);
        $('input[name$=_postalCode]', form).val(addressObject.postalCode);
        $('select[name$=_stateCode],input[name$=_stateCode]', form)
            .val(addressObject.stateCode);

        if (countryCode && typeof countryCode === 'object') {
            $('select[name$=_country]', form).val(addressObject.countryCode.value);
        } else {
            $('select[name$=_country]', form).val(addressObject.countryCode);
        }

        $('input[name$=_phone]', form).val(addressObject.phone);
    });

    $('body').trigger('shipping:updateShippingAddressFormValues', { shipping: shipping });
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
                var selected = shipping.selectedShippingMethod || {};
                var shippingMethodFormID = form.name + '_shippingAddress_shippingMethodID';
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

                    $('label', tmpl)
                        .prop('for', 'shippingMethod-' + shippingMethod.ID);
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

    $('body').trigger('shipping:updateShippingMethods', { shipping: shipping });
}

/**
 * Update list of available shipping methods whenever user modifies shipping address details.
 * @param {jQuery} $shippingForm - current shipping form
 */
function updateShippingMethodList($shippingForm) {
    // delay for autocomplete!
    setTimeout(function () {
        var $shippingMethodList = $shippingForm.find('.shipping-method-list');
        var urlParams = addressHelpers.methods.getAddressFieldsFromUI($shippingForm);
        var shipmentUUID = $shippingForm.find('[name=shipmentUUID]').val();
        var url = $shippingMethodList.data('actionUrl');
        urlParams.shipmentUUID = shipmentUUID;

        $shippingMethodList.spinner().start();
        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: urlParams,
            success: function (data) {
                if (data.error) {
                    window.location.href = data.redirectUrl;
                } else {
                    $('body').trigger('checkout:updateCheckoutView',
                        {
                            order: data.order,
                            customer: data.customer,
                            options: { keepOpen: true },
                            addressSelector: data.addressSelector
                        });

                    $shippingMethodList.spinner().stop();
                }
            }
        });
    }, 300);
}

/**
 * updates the order shipping summary for an order shipment model
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order model
 */
function updateShippingSummaryInformation(shipping, order) {
    $('[data-shipment-summary=' + shipping.UUID + ']').each(function (i, el) {
        var $container = $(el);
        var $shippingAddressLabel = $container.find('.shipping-addr-label');
        var $addressContainer = $container.find('.address-summary');
        var $shippingPhone = $container.find('.shipping-phone');
        var $methodTitle = $container.find('.shipping-method-title');
        var $methodArrivalTime = $container.find('.shipping-method-arrival-time');
        var $methodPrice = $container.find('.shipping-method-price');
        var $shippingSummaryLabel = $container.find('.shipping-method-label');
        var $summaryDetails = $container.find('.row.summary-details');

        var address = shipping.shippingAddress;
        var selectedShippingMethod = shipping.selectedShippingMethod;

        addressHelpers.methods.populateAddressSummary($addressContainer, address);

        if (address && address.phone) {
            $shippingPhone.text(address.phone);
        } else {
            $shippingPhone.empty();
        }

        if (selectedShippingMethod) {
            $('body').trigger('shipping:updateAddressLabelText',
                { selectedShippingMethod: selectedShippingMethod, resources: order.resources, shippingAddressLabel: $shippingAddressLabel });
            $shippingSummaryLabel.show();
            $summaryDetails.show();
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

    $('body').trigger('shipping:updateShippingSummaryInformation', { shipping: shipping, order: order });
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
    // checking h5 title shipping to or pickup
    var $shippingAddressLabel = $('.shipping-header-text', tmpl);
    $('body').trigger('shipping:updateAddressLabelText',
        { selectedShippingMethod: selectedMethod, resources: order.resources, shippingAddressLabel: $shippingAddressLabel });

    $viewBlock.html(tmpl.html());

    if (!keepOpen) {
        if (hasAddress) {
            $viewBlock.parents('[data-view-mode]').attr('data-view-mode', 'view');
        } else {
            $viewBlock.parents('[data-view-mode]').attr('data-view-mode', 'enter');
        }
    }

    $('body').trigger('shipping:updatePLIShippingSummaryInformation', {
        productLineItem: productLineItem,
        shipping: shipping,
        order: order,
        options: options
    });
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

        $(form).closest('.card').attr('data-shipment-uuid', shipping.UUID);
    });

    $('body').trigger('shipping:updateProductLineItemShipmentUUIDs', {
        productLineItem: productLineItem,
        shipping: shipping
    });
}

/**
 * Update the shipping UI for a single shipping info (shipment model)
 * @param {Object} shipping - the shipping (shipment model) model
 * @param {Object} order - the order/basket model
 * @param {Object} customer - the customer model
 * @param {Object} [options] - options for updating PLI summary info
 * @param {Object} [options.keepOpen] - if true, prevent changing PLI view mode to 'view'
 * @param {Object} addressSelector - the addressSelector model
 */
function updateShippingInformation(shipping, order, customer, options, addressSelector) {
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
        updateShippingAddressSelector(productLineItem, shipping, order, addressSelector);
        updatePLIShippingSummaryInformation(productLineItem, shipping, order, options);
    });

    $('body').trigger('shipping:updateShippingInformation', {
        order: order,
        shipping: shipping,
        customer: customer,
        options: options,
        addressSelector: addressSelector
    });
}

/**
 * Update the checkout state (single vs. multi-ship)
 * @param {Object} order - checkout model to use as basis of new truth
 */
function updateMultiShipInformation(order) {
    var $checkoutMain = $('#checkout-main');
    var $checkbox = $('[name=usingMultiShipping]');
    var $submitShippingBtn = $('button.submit-shipping');
    $('.shipping-error .alert-danger').remove();

    if (order.usingMultiShipping) {
        $checkoutMain.addClass('multi-ship');
        $checkbox.prop('checked', true);
    } else {
        $checkoutMain.removeClass('multi-ship');
        $checkbox.prop('checked', null);
        $submitShippingBtn.prop('disabled', null);
    }

    $('body').trigger('shipping:updateMultiShipInformation', { order: order });
}

/**
 * Handle response from the server for valid or invalid form fields.
 * @param {Object} defer - the deferred object which will resolve on success or reject.
 * @param {Object} data - the response data with the invalid form fields or
 *  valid model data.
 */
function shippingFormResponse(defer, data) {
    var isMultiShip = $('#checkout-main').hasClass('multi-ship');
    var formSelector = isMultiShip
        ? '.multi-shipping .active form'
        : '.single-shipping form';

    // highlight fields with errors
    if (data.error) {
        if (data.fieldErrors.length) {
            data.fieldErrors.forEach(function (error) {
                if (Object.keys(error).length) {
                    formHelpers.loadFormErrors(formSelector, error);
                }
            });
            defer.reject(data);
        }

        if (data.cartError) {
            window.location.href = data.redirectUrl;
            defer.reject();
        }
    } else {
        // Populate the Address Summary

        $('body').trigger('checkout:updateCheckoutView', {
            order: data.order,
            customer: data.customer,
            addressSelector: data.addressSelector
        });

        defer.resolve(data);
    }
}
/**
 * Clear out all the shipping form values and select the new address in the drop down
 * @param {Object} order - the order object
 */
function clearShippingForms(order) {
    order.shipping.forEach(function (shipping) {
        $('input[value=' + shipping.UUID + ']').each(function (formIndex, el) {
            var form = el.form;
            if (!form) return;

            $('input[name$=_firstName]', form).val(null);
            $('input[name$=_lastName]', form).val(null);
            $('input[name$=_address1]', form).val(null);
            $('input[name$=_address2]', form).val(null);
            $('input[name$=_city]', form).val(null);
            $('input[name$=_postalCode]', form).val(null);
            $('select[name$=_stateCode],input[name$=_stateCode]', form).val(null);
            $('select[name$=_country]', form).val(null);

            $('input[name$=_phone]', form).val(null);

            $(form).attr('data-address-mode', 'new');
            var addressSelectorDropDown = $('.addressSelector option[value=new]', form);
            $(addressSelectorDropDown).prop('selected', true);
        });
    });

    $('body').trigger('shipping:clearShippingForms', { order: order });
}

/**
 * Does Ajax call to create a server-side shipment w/ pliUUID & URL
 * @param {string} url - string representation of endpoint URL
 * @param {Object} shipmentData - product line item UUID
 * @returns {Object} - promise value for async call
 */
function createNewShipment(url, shipmentData) {
    $.spinner().start();
    return $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: shipmentData
    });
}

/**
 * Does Ajax call to select shipping method
 * @param {string} url - string representation of endpoint URL
 * @param {Object} urlParams - url params
 * @param {Object} el - element that triggered this call
 */
function selectShippingMethodAjax(url, urlParams, el) {
    $.spinner().start();
    $.ajax({
        url: url,
        type: 'post',
        dataType: 'json',
        data: urlParams
    })
        .done(function (data) {
            if (data.error) {
                window.location.href = data.redirectUrl;
            } else {
                $('body').trigger('checkout:updateCheckoutView',
                    {
                        order: data.order,
                        customer: data.customer,
                        options: { keepOpen: true },
                        urlParams: urlParams,
                        addressSelector: data.addressSelector
                    }
                );
                $('body').trigger('checkout:postUpdateCheckoutView',
                    {
                        el: el
                    }
                );
            }
            $.spinner().stop();
        })
        .fail(function () {
            $.spinner().stop();
        });
}

/**
 * Hide and show to appropriate elements to show the multi ship shipment cards in the enter view
 * @param {jQuery} element - The shipping content
 */
function enterMultishipView(element) {
    element.find('.btn-enter-multi-ship').removeClass('d-none');

    element.find('.view-address-block').addClass('d-none');
    element.find('.shipping-address').addClass('d-none');
    element.find('.btn-save-multi-ship.save-shipment').addClass('d-none');
    element.find('.btn-edit-multi-ship').addClass('d-none');
    element.find('.multi-ship-address-actions').addClass('d-none');
}

/**
 * Hide and show to appropriate elements to show the multi ship shipment cards in the view mode
 * @param {jQuery} element - The shipping content
 */
function viewMultishipAddress(element) {
    element.find('.view-address-block').removeClass('d-none');
    element.find('.btn-edit-multi-ship').removeClass('d-none');

    element.find('.shipping-address').addClass('d-none');
    element.find('.btn-save-multi-ship.save-shipment').addClass('d-none');
    element.find('.btn-enter-multi-ship').addClass('d-none');
    element.find('.multi-ship-address-actions').addClass('d-none');
}

/**
 * Hide and show to appropriate elements that allows the user to edit multi ship address information
 * @param {jQuery} element - The shipping content
 */
function editMultiShipAddress(element) {
    // Show
    element.find('.shipping-address').removeClass('d-none');
    element.find('.btn-save-multi-ship.save-shipment').removeClass('d-none');

    // Hide
    element.find('.view-address-block').addClass('d-none');
    element.find('.btn-enter-multi-ship').addClass('d-none');
    element.find('.btn-edit-multi-ship').addClass('d-none');
    element.find('.multi-ship-address-actions').addClass('d-none');

    $('body').trigger('shipping:editMultiShipAddress', { element: element, form: element.find('.shipping-form') });
}

/**
 * perform the proper actions once a user has clicked enter address or edit address for a shipment
 * @param {jQuery} element - The shipping content
 * @param {string} mode - the address mode
 */
function editOrEnterMultiShipInfo(element, mode) {
    var form = $(element).closest('form');
    var root = $(element).closest('.shipping-content');

    $('body').trigger('shipping:updateDataAddressMode', { form: form, mode: mode });

    editMultiShipAddress(root);

    var addressInfo = addressHelpers.methods.getAddressFieldsFromUI(form);

    var savedState = {
        UUID: $('input[name=shipmentUUID]', form).val(),
        shippingAddress: addressInfo
    };

    root.data('saved-state', JSON.stringify(savedState));
}

module.exports = {
    methods: {
        updateShippingAddressSelector: updateShippingAddressSelector,
        updateShippingAddressFormValues: updateShippingAddressFormValues,
        updateShippingMethods: updateShippingMethods,
        updateShippingSummaryInformation: updateShippingSummaryInformation,
        updatePLIShippingSummaryInformation: updatePLIShippingSummaryInformation,
        updateProductLineItemShipmentUUIDs: updateProductLineItemShipmentUUIDs,
        updateShippingInformation: updateShippingInformation,
        updateMultiShipInformation: updateMultiShipInformation,
        shippingFormResponse: shippingFormResponse,
        createNewShipment: createNewShipment,
        selectShippingMethodAjax: selectShippingMethodAjax,
        updateShippingMethodList: updateShippingMethodList,
        clearShippingForms: clearShippingForms,
        editMultiShipAddress: editMultiShipAddress,
        editOrEnterMultiShipInfo: editOrEnterMultiShipInfo
    },

    selectShippingMethod: function () {
        $('.shipping-method-list').change(function () {
            var $shippingForm = $(this).parents('form');
            var methodID = $(':checked', this).val();
            var shipmentUUID = $shippingForm.find('[name=shipmentUUID]').val();
            var urlParams = addressHelpers.methods.getAddressFieldsFromUI($shippingForm);
            urlParams.shipmentUUID = shipmentUUID;
            urlParams.methodID = methodID;

            var url = $(this).data('select-shipping-method-url');
            selectShippingMethodAjax(url, urlParams, $(this));
        });
    },

    toggleMultiship: function () {
        $('input[name="usingMultiShipping"]').on('change', function () {
            var url = $('.multi-shipping-checkbox-block form').attr('action');
            var usingMultiShip = this.checked;

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: { usingMultiShip: usingMultiShip },
                success: function (response) {
                    if (response.error) {
                        window.location.href = response.redirectUrl;
                    } else {
                        $('body').trigger('checkout:updateCheckoutView', {
                            order: response.order,
                            customer: response.customer,
                            addressSelector: response.addressSelector
                        });

                        if ($('#checkout-main').data('customer-type') === 'guest') {
                            clearShippingForms(response.order);
                        } else {
                            response.order.shipping.forEach(function (shipping) {
                                $('input[value=' + shipping.UUID + ']').each(function (formIndex, el) {
                                    var form = el.form;
                                    if (!form) return;

                                    $(form).attr('data-address-mode', 'edit');
                                    var addressSelectorDropDown = $(form).find('.addressSelector option[value="ab_' + shipping.matchingAddressId + '"]');
                                    $(addressSelectorDropDown).prop('selected', true);
                                });
                            });
                        }

                        if (usingMultiShip) {
                            $('body').trigger('shipping:selectMultiShipping', { data: response });
                        } else {
                            $('body').trigger('shipping:selectSingleShipping', { data: response });
                        }
                    }

                    $.spinner().stop();
                },
                error: function () {
                    $.spinner().stop();
                }
            });
        });
    },

    selectSingleShipping: function () {
        $('body').on('shipping:selectSingleShipping', function () {
            $('.single-shipping .shipping-address').removeClass('d-none');
        });
    },

    selectMultiShipping: function () {
        $('body').on('shipping:selectMultiShipping', function (e, data) {
            $('.multi-shipping .shipping-address').addClass('d-none');

            data.data.order.shipping.forEach(function (shipping) {
                var element = $('.multi-shipping .card[data-shipment-uuid="' + shipping.UUID + '"]');

                if (shipping.shippingAddress) {
                    viewMultishipAddress($(element));
                } else {
                    enterMultishipView($(element));
                }
            });
        });
    },

    selectSingleShipAddress: function () {
        $('.single-shipping .addressSelector').on('change', function () {
            var form = $(this).parents('form')[0];
            var selectedOption = $('option:selected', this);
            var attrs = selectedOption.data();
            var shipmentUUID = selectedOption[0].value;
            var originalUUID = $('input[name=shipmentUUID]', form).val();
            var element;

            Object.keys(attrs).forEach(function (attr) {
                element = attr === 'countryCode' ? 'country' : attr;
                $('[name$=' + element + ']', form).val(attrs[attr]);
            });

            $('[name$=stateCode]', form).trigger('change');

            if (shipmentUUID === 'new') {
                $(form).attr('data-address-mode', 'new');
            } else if (shipmentUUID === originalUUID) {
                $(form).attr('data-address-mode', 'shipment');
            } else if (shipmentUUID.indexOf('ab_') === 0) {
                $(form).attr('data-address-mode', 'customer');
            } else {
                $(form).attr('data-address-mode', 'edit');
            }
        });
    },

    selectMultiShipAddress: function () {
        $('.multi-shipping .addressSelector').on('change', function () {
            var form = $(this).closest('form');
            var selectedOption = $('option:selected', this);
            var attrs = selectedOption.data();
            var shipmentUUID = selectedOption[0].value;
            var originalUUID = $('input[name=shipmentUUID]', form).val();
            var pliUUID = $('input[name=productLineItemUUID]', form).val();

            var element;
            Object.keys(attrs).forEach(function (attr) {
                element = attr === 'countryCode' ? 'country' : attr;
                $('[name$=' + element + ']', form).val(attrs[attr]);
            });

            if (shipmentUUID === 'new' && pliUUID) {
                var createShipmentUrl = $(this).attr('data-create-shipment-url');
                createNewShipment(createShipmentUrl, { productLineItemUUID: pliUUID })
                    .done(function (response) {
                        $.spinner().stop();
                        if (response.error) {
                            if (response.redirectUrl) {
                                window.location.href = response.redirectUrl;
                            }
                            return;
                        }

                        $('body').trigger('checkout:updateCheckoutView',
                            {
                                order: response.order,
                                customer: response.customer,
                                options: { keepOpen: true },
                                addressSelector: response.addressSelector
                            }
                        );

                        $(form).attr('data-address-mode', 'new');
                    })
                    .fail(function () {
                        $.spinner().stop();
                    });
            } else if (shipmentUUID === originalUUID) {
                $('select[name$=stateCode]', form).trigger('change');
                $(form).attr('data-address-mode', 'shipment');
            } else if (shipmentUUID.indexOf('ab_') === 0) {
                var url = $(form).attr('action');
                var serializedData = $(form).serialize();
                createNewShipment(url, serializedData)
                    .done(function (response) {
                        $.spinner().stop();
                        if (response.error) {
                            if (response.redirectUrl) {
                                window.location.href = response.redirectUrl;
                            }
                            return;
                        }

                        $('body').trigger('checkout:updateCheckoutView',
                            {
                                order: response.order,
                                customer: response.customer,
                                options: { keepOpen: true },
                                addressSelector: response.addressSelector
                            }
                        );

                        $(form).attr('data-address-mode', 'customer');
                        var $rootEl = $(form).closest('.shipping-content');
                        editMultiShipAddress($rootEl);
                    })
                    .fail(function () {
                        $.spinner().stop();
                    });
            } else {
                var updatePLIShipmentUrl = $(form).attr('action');
                var serializedAddress = $(form).serialize();
                createNewShipment(updatePLIShipmentUrl, serializedAddress)
                    .done(function (response) {
                        $.spinner().stop();
                        if (response.error) {
                            if (response.redirectUrl) {
                                window.location.href = response.redirectUrl;
                            }
                            return;
                        }

                        $('body').trigger('checkout:updateCheckoutView',
                            {
                                order: response.order,
                                customer: response.customer,
                                options: { keepOpen: true },
                                addressSelector: response.addressSelector
                            }
                        );

                        $(form).attr('data-address-mode', 'edit');
                    })
                    .fail(function () {
                        $.spinner().stop();
                    });
            }
        });
    },

    updateShippingList: function () {
        $('select[name$="shippingAddress_addressFields_states_stateCode"]')
            .on('change', function (e) {
                updateShippingMethodList($(e.currentTarget.form));
            });
    },

    updateDataAddressMode: function () {
        $('body').on('shipping:updateDataAddressMode', function (e, data) {
            $(data.form).attr('data-address-mode', data.mode);
        });
    },

    enterMultiShipInfo: function () {
        $('.btn-enter-multi-ship').on('click', function (e) {
            e.preventDefault();

            editOrEnterMultiShipInfo($(this), 'new');
        });
    },

    editMultiShipInfo: function () {
        $('.btn-edit-multi-ship').on('click', function (e) {
            e.preventDefault();

            editOrEnterMultiShipInfo($(this), 'edit');
        });
    },

    saveMultiShipInfo: function () {
        $('.btn-save-multi-ship').on('click', function (e) {
            e.preventDefault();

            // Save address to checkoutAddressBook
            var form = $(this).closest('form');
            var $rootEl = $(this).closest('.shipping-content');
            var data = $(form).serialize();
            var url = $(form).attr('action');

            $rootEl.spinner().start();
            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: data
            })
                .done(function (response) {
                    formHelpers.clearPreviousErrors(form);
                    if (response.error) {
                        formHelpers.loadFormErrors(form, response.fieldErrors);
                    } else {
                        // Update UI from response
                        $('body').trigger('checkout:updateCheckoutView',
                            {
                                order: response.order,
                                customer: response.customer,
                                addressSelector: response.addressSelector
                            }
                        );

                        viewMultishipAddress($rootEl);
                    }

                    if (response.order && response.order.shippable) {
                        $('button.submit-shipping').attr('disabled', null);
                    }

                    $rootEl.spinner().stop();
                })
                .fail(function (err) {
                    if (err.responseJSON.redirectUrl) {
                        window.location.href = err.responseJSON.redirectUrl;
                    }

                    $rootEl.spinner().stop();
                });

            return false;
        });
    },

    cancelMultiShipAddress: function () {
        $('.btn-cancel-multi-ship-address').on('click', function (e) {
            e.preventDefault();

            var form = $(this).closest('form');
            var $rootEl = $(this).closest('.shipping-content');
            var restoreState = $rootEl.data('saved-state');

            // Should clear out changes / restore previous state
            if (restoreState) {
                var restoreStateObj = JSON.parse(restoreState);
                var originalStateCode = restoreStateObj.shippingAddress.stateCode;
                var stateCode = $('[name$=_stateCode]', form).val();

                updateShippingAddressFormValues(restoreStateObj);

                if (stateCode !== originalStateCode) {
                    $('[data-action=save]', form).trigger('click');
                } else {
                    $(form).attr('data-address-mode', 'edit');
                    editMultiShipAddress($rootEl);
                }
            }

            return false;
        });
    }
};

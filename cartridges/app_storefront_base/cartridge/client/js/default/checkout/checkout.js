'use strict';

var addressHelpers = require('./addressHelpers');
var billingHelpers = require('./billing');
var shippingHelpers = require('./shipping');

/**
 * Create the jQuery Checkout Plugin.
 *
 * This jQuery plugin will be registered on the dom element in checkout.isml with the
 * id of "checkout-main".
 *
 * The checkout plugin will handle the different state the user interface is in as the user
 * progresses through the varying forms such as shipping and payment.
 *
 * Billing info and payment info are used a bit synonymously in this code.
 *
 */
(function ($) {
    $.fn.checkout = function () { // eslint-disable-line
        var plugin = this;

        //
        // Collect form data from user input
        //
        var formData = {
            // Shipping Address
            shipping: {},

            // Billing Address
            billing: {},

            // Payment
            payment: {},

            // Gift Codes
            giftCode: {}
        };

        //
        // The different states/stages of checkout
        //
        var checkoutStages = [
            'shipping',
            'payment',
            'placeOrder',
            'submitted'
        ];

        /**
         * updates the totals summary
         * @param {Array} totals - the totals data
         */
        function updateTotals(totals) {
            $('.shipping-total-cost').text(totals.totalShippingCost);
            $('.tax-total').text(totals.totalTax);
            $('.sub-total').text(totals.subTotal);
            $('.grand-total-sum').text(totals.grandTotal);

            if (totals.orderLevelDiscountTotal.value > 0) {
                $('.order-discount').show();
                $('.order-discount-total').text('- ' + totals.orderLevelDiscountTotal.formatted);
            } else {
                $('.order-discount').hide();
            }

            if (totals.shippingLevelDiscountTotal.value > 0) {
                $('.shipping-discount').show();
                $('.shipping-discount-total').text('- ' +
                    totals.shippingLevelDiscountTotal.formatted);
            } else {
                $('.shipping-discount').hide();
            }
        }

        /**
         * updates the order product shipping summary for an order model
         * @param {Object} order - the order model
         */
        function updateOrderProductSummaryInformation(order) {
            var $productSummary = $('<div />');
            order.shipping.forEach(function (shipping) {
                shipping.productLineItems.items.forEach(function (lineItem) {
                    var pli = $('[data-product-line-item=' + lineItem.UUID + ']');
                    $productSummary.append(pli);
                });

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
                        ? '( ' + selectedMethod.estimatedArrivalTime + ' )'
                        : '';

                var tmpl = $('#pli-shipping-summary-template').clone();

                if (shipping.productLineItems.items && shipping.productLineItems.items.length > 1) {
                    $('h5 > span').text(' - ' + shipping.productLineItems.items.length + ' '
                        + order.resources.items);
                } else {
                    $('h5 > span').text('');
                }

                if (shipping.shippingAddress
                        && shipping.shippingAddress.firstName
                        && shipping.shippingAddress.lastName
                        && shipping.shippingAddress.address1
                        && shipping.shippingAddress.city
                        && shipping.shippingAddress.stateCode
                        && shipping.shippingAddress.countryCode
                        && shipping.shippingAddress.phone
                ) {
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

                    $('.ship-to-message').text('');
                } else {
                    $('.ship-to-message').text(order.resources.addressIncomplete);
                }


                if (shipping.selectedShippingMethod) {
                    $('.display-name', tmpl).text(methodNameLine);
                    $('.arrival-time', tmpl).text(methodArrivalTime);
                    $('.price', tmpl).text(shippingCost);
                }

                var $shippingSummary = $('<div class="multi-shipping" data-shipment-summary="'
                    + shipping.UUID + '" />');
                $shippingSummary.html(tmpl.html());
                $productSummary.append($shippingSummary);
            });

            $('.product-summary-block').html($productSummary.html());
        }

        /**
         * Update the entire Checkout UI, based on current state (order model)
         * @param {Object} order - checkout model
         * @param {Object} customer - customer model
         * @param {Object} [options] - options for updating PLI summary info
         * @param {Object} [options.keepOpen] - if true, prevent changing PLI view mode to 'view'
         */
        function updateCheckoutView(order, customer, options) {
            shippingHelpers.updateMultiShipInformation(order);
            updateTotals(order.totals);
            order.shipping.forEach(function (shipping) {
                shippingHelpers.updateShippingInformation(shipping, order, customer, options);
            });
            billingHelpers.updateBillingInformation(order, customer, options);
            billingHelpers.updatePaymentInformation(order, options);
            updateOrderProductSummaryInformation(order, options);
        }

        /**
         * Display error messages and highlight form fields with errors.
         * @param {string} parentSelector - the form which contains the fields
         * @param {Object} fieldErrors - the fields with errors
         */
        function loadFormErrors(parentSelector, fieldErrors) { // eslint-disable-line
            // Display error messages and highlight form fields with errors.
            $.each(fieldErrors, function (attr) {
                $('*[name=' + attr + ']', parentSelector)
                    .parents('.form-group').first()
                    .addClass('has-danger')
                    .find('.form-control-feedback')
                    .html(fieldErrors[attr]);
            });
        }

        /**
         * Handle response from the server for valid or invalid form fields.
         * @param {Object} defer - the deferred object which will resolve on success or reject.
         * @param {Object} data - the response data with the invalid form fields or
         *  valid model data.
         */
        function shippingFormResponse(defer, data) {
            var isMultiShip = $('#checkout-main').hasClass('multi-ship');
            var formSelector = isMultiShip ?
                '.multi-shipping .active form' : '.single-shipping .active form';

            // highlight fields with errors
            if (data.error) {
                if (data.fieldErrors.length) {
                    data.fieldErrors.forEach(function (error) {
                        if (Object.keys(error).length) {
                            loadFormErrors(formSelector, error);
                        }
                    });
                    defer.reject(data);
                }

                if (data.cartError) {
                    window.location.href = data.redirectUrl;
                    defer.reject();
                }
            } else {
                //
                // Populate the Address Summary
                //
                updateCheckoutView(data.order, data.customer);

                defer.resolve(data);
            }
        }


        /**
         * Clear the form errors.
         * @param {string} parentSelector - the parent form selector.
         */
        function clearPreviousErrors(parentSelector) {
            $('*[name]', parentSelector)
                .parents('.form-group').removeClass('has-danger');
            $('.error-message').hide();
        }

        /**
         * Updates the URL to determine stage
         * @param {number} currentStage - The current stage the user is currently on in the checkout
         */
        function updateUrl(currentStage) {
            history.pushState(
                checkoutStages[currentStage],
                document.title,
                location.pathname
                + '?stage='
                + checkoutStages[currentStage]
                + '#'
                + checkoutStages[currentStage]
            );
        }

        //
        // Local member methods of the Checkout plugin
        //
        var members = {

            // initialize the currentStage variable for the first time
            currentStage: 0,

            /**
             * Set or update the checkout stage (AKA the shipping, billing, payment, etc... steps)
             * @returns {Object} a promise
             */
            updateStage: function () {
                var stage = checkoutStages[members.currentStage];
                var defer = $.Deferred(); // eslint-disable-line

                if (stage === 'shipping') {
                    //
                    // Clear Previous Errors
                    //
                    clearPreviousErrors('.shipping-form');

                    //
                    // Submit the Shipiing Address Form
                    //
                    var isMultiShip = $('#checkout-main').hasClass('multi-ship');
                    var formSelector = isMultiShip ?
                            '.multi-shipping .active form' : '.single-shipping .active form';
                    var form = $(formSelector);
                    if (isMultiShip && form.length === 0) {
                        // in case the multi ship form is already submitted
                        var url = $('#checkout-main').attr('data-checkout-get-url');
                        $.ajax({
                            url: url,
                            method: 'GET',
                            success: function (data) {
                                updateCheckoutView(data.order, data.customer);
                                defer.resolve();
                            },
                            error: function () {
                                // Server error submitting form
                                defer.reject();
                            }
                        });
                    } else {
                        $.ajax({
                            url: form.attr('action'),
                            method: 'POST',
                            data: form.serialize(),
                            success: function (data) {
                                shippingFormResponse(defer, data);
                            },
                            error: function (err) {
                                if (err.responseJSON.redirectUrl) {
                                    window.location.href = err.responseJSON.redirectUrl;
                                }
                                // Server error submitting form
                                defer.reject();
                            }
                        });
                    }
                    return defer;
                } else if (stage === 'payment') {
                    //
                    // Submit the Billing Address Form
                    //

                    clearPreviousErrors('.payment-form');

                    var paymentForm = $('#dwfrm_billing').serialize();

                    if ($('.data-checkout-stage').data('customer-type') === 'registered') {
                        // if payment method is credit card
                        if ($('.payment-information').data('payment-method-id') === 'CREDIT_CARD') {
                            if (!($('.payment-information').data('is-new-payment'))) {
                                var cvvCode = $('.saved-payment-instrument.' +
                                    'selected-payment .saved-payment-security-code').val();

                                if (cvvCode === '') {
                                    $('.saved-payment-instrument.' +
                                        'selected-payment ' +
                                        '.saved-security-code').addClass('has-danger');
                                    defer.reject();
                                    return defer;
                                }

                                var $savedPaymentInstrument = $('.saved-payment-instrument' +
                                    '.selected-payment'
                                );

                                paymentForm += '&storedPaymentUUID=' +
                                    $savedPaymentInstrument.data('uuid');

                                paymentForm += '&securityCode=' + cvvCode;
                            }
                        }
                    }

                    $.ajax({
                        url: $('#dwfrm_billing').attr('action'),
                        method: 'POST',
                        data: paymentForm,
                        success: function (data) {
                            // look for field validation errors
                            if (data.error) {
                                if (data.fieldErrors.length) {
                                    data.fieldErrors.forEach(function (error) {
                                        if (Object.keys(error).length) {
                                            loadFormErrors('.payment-form', error);
                                        }
                                    });
                                }

                                if (data.serverErrors.length) {
                                    data.serverErrors.forEach(function (error) {
                                        $('.error-message').show();
                                        $('.error-message-text').text(error);
                                    });
                                }

                                if (data.cartError) {
                                    window.location.href = data.redirectUrl;
                                }

                                defer.reject();
                            } else {
                                //
                                // Populate the Address Summary
                                //
                                updateCheckoutView(data.order, data.customer);

                                if (data.renderedPaymentInstruments) {
                                    $('.stored-payments').empty().html(
                                        data.renderedPaymentInstruments
                                    );
                                }

                                if (data.customer.registeredUser
                                    && data.customer.customerPaymentInstruments.length
                                ) {
                                    $('.cancel-new-payment').removeClass('checkout-hidden');
                                }

                                defer.resolve(data);
                            }
                        },
                        error: function (err) {
                            if (err.responseJSON.redirectUrl) {
                                window.location.href = err.responseJSON.redirectUrl;
                            }
                        }
                    });

                    return defer;
                } else if (stage === 'placeOrder') {
                    $.ajax({
                        url: $('.place-order').data('action'),
                        method: 'POST',
                        success: function (data) {
                            if (data.error) {
                                if (data.cartError) {
                                    window.location.href = data.redirectUrl;
                                    defer.reject();
                                } else {
                                    // go to appropriate stage and display error message
                                    defer.reject(data);
                                }
                            } else {
                                var continueUrl = data.continueUrl;
                                var urlParams = {
                                    ID: data.orderID,
                                    token: data.orderToken
                                };

                                continueUrl += (continueUrl.indexOf('?') !== -1 ? '&' : '?') +
                                    Object.keys(urlParams).map(function (key) {
                                        return key + '=' + encodeURIComponent(urlParams[key]);
                                    }).join('&');

                                window.location.href = continueUrl;
                                defer.resolve(data);
                            }
                        },
                        error: function () {
                        }
                    });

                    return defer;
                }
                var p = $('<div>').promise(); // eslint-disable-line
                setTimeout(function () {
                    p.done(); // eslint-disable-line
                }, 500);
                return p; // eslint-disable-line
            },

            updateShippingMethodList: function (event) {
                // delay for autocomplete!
                setTimeout(function () {
                    var $shippingForm = $(event.currentTarget.form);
                    var $shippingMethodList = $shippingForm.find('.shipping-method-list');
                    var urlParams = addressHelpers.getAddressFieldsFromUI($shippingForm);
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
                                updateCheckoutView(data.order, data.customer, { keepOpen: true });

                                $shippingMethodList.spinner().stop();
                            }
                        }
                    });
                }, 300);
            },

            /**
             * Initialize the checkout stage.
             *
             * TODO: update this to allow stage to be set from server?
             */
            initialize: function () {
                // set the initial state of checkout
                members.currentStage = checkoutStages
                    .indexOf($('.data-checkout-stage').data('checkout-stage'));
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);

                var toggleMultiShip = function (checked) {
                    var url = $('.shipping-nav form').attr('action');
                    $.spinner().start();
                    $.ajax({
                        url: url,
                        type: 'post',
                        dataType: 'json',
                        data: {
                            usingMultiShip: !!checked
                        },
                        success: function (data) {
                            if (data.error) {
                                window.location.href = data.redirectUrl;
                            } else {
                                updateCheckoutView(data.order, data.customer);
                            }
                            $.spinner().stop();
                        },
                        error: function () {
                            $.spinner().stop();
                        }
                    });
                };

                $('input[name="usingMultiShipping"]').on('change', function () {
                    var checked = this.checked;
                    toggleMultiShip(checked);
                });

                $('.btn-show-details').on('click', function () {
                    $(this).parents('[data-address-mode]').attr('data-address-mode', 'details');
                });

                $('.btn-hide-details').on('click', function () {
                    $(this).parents('[data-address-mode]').attr('data-address-mode', 'edit');
                });

                $('.btn-add-new').on('click', function () {
                    var $el = $(this);
                    if ($el.parents('#dwfrm_billing').length > 0) {
                        // Handle billing address case
                        billingHelpers.clearBillingAddressFormValues();
                        var $option = $($el.parents('form').find('.addressSelector option')[0]);
                        $option.attr('value', 'new');
                        $option.text('New Address');
                        $el.parents('[data-address-mode]').attr('data-address-mode', 'new');
                    } else {
                        // Handle shipping address case
                        var $newEl = $el.parents('form').find('.addressSelector option[value=new]');
                        $newEl.prop('selected', 'selected');
                        $newEl.parent().trigger('change');
                    }
                });

                $('.btn-show-billing-details').on('click', function () {
                    $(this).parents('[data-address-mode]').attr('data-address-mode', 'new');
                });

                $('.btn-hide-billing-details').on('click', function () {
                    $(this).parents('[data-address-mode]').attr('data-address-mode', 'shipment');
                });

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

                $('.payment-form .addressSelector').on('change', function () {
                    var form = $(this).parents('form')[0];
                    var selectedOption = $('option:selected', this);
                    var optionID = selectedOption[0].value;

                    if (optionID === 'new') {
                        // Show Address
                        $(form).attr('data-address-mode', 'new');
                    } else {
                        // Hide Address
                        $(form).attr('data-address-mode', 'shipment');
                    }

                    // Copy fields
                    var attrs = selectedOption.data();

                    Object.keys(attrs).forEach(function (attr) {
                        $('[name$=' + attr + ']', form).val(attrs[attr]);
                    });
                });

                $('.single-shipping .addressSelector').on('change', function () {
                    var form = $(this).parents('form')[0];
                    var selectedOption = $('option:selected', this);
                    var attrs = selectedOption.data();
                    var shipmentUUID = selectedOption[0].value;
                    var originalUUID = $('input[name=shipmentUUID]', form).val();

                    Object.keys(attrs).forEach(function (attr) {
                        $('[name$=' + attr + ']', form).val(attrs[attr]);
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

                $('.product-shipping-block .addressSelector').on('change', function () {
                    var form = $(this).parents('form')[0];
                    var selectedOption = $('option:selected', this);
                    var attrs = selectedOption.data();
                    var shipmentUUID = selectedOption[0].value;
                    var originalUUID = $('input[name=shipmentUUID]', form).val();
                    var pliUUID = $('input[name=productLineItemUUID]', form).val();

                    Object.keys(attrs).forEach(function (attr) {
                        $('[name$=' + attr + ']', form).val(attrs[attr]);
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

                            updateCheckoutView(response.order, response.customer,
                                { keepOpen: true }
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
                        var url = form.action;
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

                            updateCheckoutView(response.order, response.customer,
                                { keepOpen: true }
                            );
                            $(form).attr('data-address-mode', 'customer');
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

                            updateCheckoutView(response.order, response.customer,
                                { keepOpen: true }
                            );
                            // $('select[name$=stateCode]', form).trigger('change');
                            $(form).attr('data-address-mode', 'edit');
                        })
                        .fail(function () {
                            $.spinner().stop();
                        });
                    }
                });

                $('.product-shipping-block [data-action]').on('click', function (e) {
                    e.preventDefault();

                    var action = $(this).data('action');
                    var $rootEl = $(this).parents('[data-view-mode]');
                    var form = $(this).parents('form')[0];

                    switch (action) {
                        case 'enter':
                        case 'edit':
                        // do nothing special, just show the edit address view
                            if (action === 'enter') {
                                $(form).attr('data-address-mode', 'new');
                            } else {
                                $(form).attr('data-address-mode', 'edit');
                            }

                            $rootEl.attr('data-view-mode', 'edit');
                            var addressInfo = addressHelpers.getAddressFieldsFromUI(form);
                            var savedState = {
                                UUID: $('input[name=shipmentUUID]', form).val(),
                                shippingAddress: addressInfo
                            };

                            $rootEl.data('saved-state', JSON.stringify(savedState));
                            break;
                        case 'cancel':
                            // Should clear out changes / restore previous state
                            var restoreState = $rootEl.data('saved-state');
                            if (restoreState) {
                                shippingHelpers.updateShippingAddressFormValues(
                                    JSON.parse(restoreState)
                                );
                            }
                            $(form).attr('data-address-mode', 'edit');
                            break;
                        case 'save':
                        // Save address to checkoutAddressBook
                            var data = $(form).serialize();
                            var url = form.action;
                            $rootEl.spinner().start();
                            $.ajax({
                                url: url,
                                type: 'post',
                                dataType: 'json',
                                data: data
                            })
                            .done(function (response) {
                                clearPreviousErrors(form);
                                if (response.error) {
                                    loadFormErrors(form, response.fieldErrors);
                                } else {
                                    // Update UI from response
                                    updateCheckoutView(response.order, response.customer);

                                    $rootEl.attr('data-view-mode', 'view');
                                }

                                if (response.order && response.order.shippable) {
                                    $('button.submit-shipping').attr('disabled', null);
                                } else {
                                    $('button.submit-shipping').attr('disabled', 'disabled');
                                }
                                $rootEl.spinner().stop();
                            })
                            .fail(function (err) {
                                if (err.responseJSON.redirectUrl) {
                                    window.location.href = err.responseJSON.redirectUrl;
                                }

                                $rootEl.spinner().stop();
                            });

                            // pull down applicable shipping methods
                            break;
                        default:
                            // console.error('unhandled tab target: ' + testTarget);
                    }
                    return false;
                });

                //
                // Handle Next State button click
                //
                $(plugin).on('click', '.next-step-button button', function () {
                    members.nextStage();
                });

                //
                // Handle Edit buttons on shipping and payment summary cards
                //
                $('.shipping-summary .edit-button', plugin).on('click', function () {
                    members.gotoStage('shipping');
                });

                $('.payment-summary .edit-button', plugin).on('click', function () {
                    members.gotoStage('payment');
                });

                //
                // Handle Credit Card Number
                //
                $('#checkout-main').on('keyup', '#cardNumber', function () {
                    var firstDigit = $(this).val()[0];

                    var cardMap = {
                        4: 'Visa',
                        5: 'Master Card',
                        3: 'Amex',
                        6: 'Discover'
                    };

                    if (cardMap[firstDigit]) {
                        $('#cardType').val(cardMap[firstDigit]);
                    } else {
                        $('#cardType').val('Visa');
                    }
                });

                //
                // remember stage (e.g. shipping)
                //
                updateUrl(members.currentStage);

                //
                // Listen for foward/back button press and move to correct checkout-stage
                //
                $(window).on('popstate', function (e) {
                    //
                    // Back button when event state less than current state in ordered
                    // checkoutStages array.
                    //
                    if (e.state === null ||
                         checkoutStages.indexOf(e.state) < members.currentStage) {
                        members.handlePrevStage(false);
                    } else if (checkoutStages.indexOf(e.state) > members.currentStage) {
                        // Forward button  pressed
                        members.handleNextStage(false);
                    }
                });

                $('select[name$="shippingAddress_addressFields_states_stateCode"]').on('change',
                    members.updateShippingMethodList
                );

                $('.shipping-method-list').change(function () {
                    var $shippingForm = $(this).parents('form');
                    var methodID = $(':checked', this).val();
                    var shipmentUUID = $shippingForm.find('[name=shipmentUUID]').val();
                    var urlParams = addressHelpers.getAddressFieldsFromUI($shippingForm);
                    urlParams.shipmentUUID = shipmentUUID;
                    urlParams.methodID = methodID;

                    var url = $(this).data('select-shipping-method-url');
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
                             updateCheckoutView(data.order, data.customer, { keepOpen: true });
                         }
                         $.spinner().stop();
                     })
                     .fail(function () {
                         $.spinner().stop();
                     });
                });

                // billingHelpers.paymentMethodSelect
                $('.payment-options .nav-item').on('click', function (e) {
                    e.preventDefault();
                    var methodID = $(this).data('method-id');
                    $('.payment-information').data('payment-method-id', methodID);
                });

                // billingHelpers.selectSavedPaymentInstrument
                $(document).on('click', '.saved-payment-instrument', function (e) {
                    e.preventDefault();
                    $('.saved-payment-security-code').val('');
                    $('.saved-payment-instrument').removeClass('selected-payment');
                    $(this).addClass('selected-payment');
                    $('.saved-payment-instrument .card-image').removeClass('checkout-hidden');
                    $('.saved-payment-instrument .security-code-input').addClass('checkout-hidden');
                    $('.saved-payment-instrument.selected-payment' +
                        ' .card-image').addClass('checkout-hidden');
                    $('.saved-payment-instrument.selected-payment ' +
                        '.security-code-input').removeClass('checkout-hidden');
                });

                // billingHelpers.addNewPayment
                $('.btn.add-payment').on('click', function (e) {
                    e.preventDefault();
                    $('.payment-information').data('is-new-payment', true);
                    billingHelpers.clearCreditCardForm();
                    $('.credit-card-form').removeClass('checkout-hidden');
                    $('.user-payment-instruments').addClass('checkout-hidden');
                });

                // billingHelpers.cancelAddNewPayment
                $('.cancel-new-payment').on('click', function (e) {
                    e.preventDefault();
                    $('.payment-information').data('is-new-payment', false);
                    billingHelpers.clearCreditCardForm();
                    $('.user-payment-instruments').removeClass('checkout-hidden');
                    $('.credit-card-form').addClass('checkout-hidden');
                });

                //
                // Set the form data
                //
                plugin.data('formData', formData);
            },

            /**
             * The next checkout state step updates the css for showing correct buttons etc...
             */
            nextStage: function () {
                var promise = members.updateStage();

                promise.done(function () {
                    // Update UI with new stage
                    members.handleNextStage(true);
                });

                promise.fail(function (data) {
                    // show errors
                    if (data) {
                        if (data.errorStage) {
                            members.gotoStage(data.errorStage.stage);
                        }

                        if (data.errorMessage) {
                            $('.error-message').show();
                            $('.error-message-text').text(data.errorMessage);
                        }
                    }
                });
            },

            /**
             * The next checkout state step updates the css for showing correct buttons etc...
             *
             * @param {boolean} bPushState - boolean when true pushes state using the history api.
             */
            handleNextStage: function (bPushState) {
                if (members.currentStage < checkoutStages.length - 1) {
                    // move stage forward
                    members.currentStage++;

                    //
                    // show new stage in url (e.g.payment)
                    //
                    if (bPushState) {
                        updateUrl(members.currentStage);
                    }
                }

                // Set the next stage on the DOM
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            },

            /**
             * Previous State
             */
            handlePrevStage: function () {
                if (members.currentStage > 0) {
                    // move state back
                    members.currentStage--;
                    updateUrl(members.currentStage);
                }

                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            },

            /**
             * Use window history to go to a checkout stage
             * @param {string} stageName - the checkout state to goto
             */
            gotoStage: function (stageName) {
                members.currentStage = checkoutStages.indexOf(stageName);
                updateUrl(members.currentStage);
                $(plugin).attr('data-checkout-stage', checkoutStages[members.currentStage]);
            }
        };

        //
        // Initialize the checkout
        //
        members.initialize();

        return this;
    };
}(jQuery));


module.exports = function () {
    $('#checkout-main').checkout();
};

/* globals google */
'use strict';

/**
 * appends params to a url
 * @param {string} url - Original url
 * @param {Object} params - Parameters to append
 * @returns {string} result url with appended parameters
 */
function appendToUrl(url, params) {
    var newUrl = url;
    newUrl += (newUrl.indexOf('?') !== -1 ? '&' : '?') + Object.keys(params).map(function (key) {
        return key + '=' + encodeURIComponent(params[key]);
    }).join('&');

    return newUrl;
}

/**
 * Uses google maps api to render a map
 */
function maps() {
    var map;
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
        scrollwheel: false,
        zoom: 8,
        center: latlng
    };

    map = new google.maps.Map($('.map-canvas')[0], mapOptions);
    var mapdiv = $('.map-canvas').attr('data-locations');

    mapdiv = JSON.parse(mapdiv);

    Object.keys(mapdiv).forEach(function (key) {
        var item = mapdiv[key];
        var storeLocation = new google.maps.LatLng(item.latitude, item.longitude);
        map.setCenter(storeLocation);
        var marker = new google.maps.Marker({
            position: storeLocation,
            map: map,
            title: item.name
        });
        marker.setMap(map);
    });
}

/**
 * Renders the results of the search and updates the map
 * @param {Object} data - Response from the server
 */
function updateStoresResults(data) {
    var $resultsDiv = $('.results');
    var $mapDiv = $('.map-canvas');

    if (data.stores.length === 0) {
        $('.store-locator-no-results').show();
    } else {
        $('.store-locator-no-results').hide();
    }

    $resultsDiv.empty();
    $resultsDiv.data('has-results', data.stores.length);
    $resultsDiv.attr('data-radius', data.radius);
    $resultsDiv.attr('data-search-key', JSON.stringify(data.searchKey));
    $mapDiv.attr('data-locations', data.locations);

    if (JSON.parse($mapDiv.attr('data-hasGoogleApi')) !== false) {
        maps();
    } else {
        $('.store-locator-no-apiKey').show();
    }

    if (data.storesResultsHtml) {
        $resultsDiv.append(data.storesResultsHtml);
    }
}

module.exports = function () {
    if (JSON.parse($('.map-canvas').attr('data-hasGoogleApi'))) {
        maps();
    } else {
        $('.store-locator-no-apiKey').show();
    }

    if ($('.results').data('has-results') === 0) {
        $('.store-locator-no-results').show();
    }

    // clicking on detect location.
    $('.detect-location').on('click', function () {
        $.spinner().start();
        if (!navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(function (position) {
            var detectLocationButton = $('.detect-location');
            var url = detectLocationButton.data('action');
            var radius = $('.results').attr('data-radius');
            var urlParams = {
                radius: radius,
                lat: position.coords.latitude,
                long: position.coords.longitude
            };

            url = appendToUrl(url, urlParams);
            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                success: function (data) {
                    $.spinner().stop();
                    updateStoresResults(data);
                }
            });
        });
    });

    $('.store-locator').submit(function (e) {
        e.preventDefault();
        var $form = $('.store-locator');
        var radius = $('.results').attr('data-radius');
        var url = $form.attr('action');
        var urlParams = { radius: radius };

        url = appendToUrl(url, urlParams);

        $.ajax({
            url: url,
            type: $form.attr('method'),
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                updateStoresResults(data);
            }
        });
        return false;
    });

    $('.radius').change(function () {
        var radius = $(this).val();
        var searchKeys = $('.results').attr('data-search-key');
        var url = $('.radius').data('action');
        var urlParams = {};

        searchKeys = JSON.parse(searchKeys);

        if (searchKeys.postalCode) {
            urlParams = {
                radius: radius,
                postalCode: searchKeys.postalCode
            };
        } else if (searchKeys.lat && searchKeys.long) {
            urlParams = {
                radius: radius,
                lat: searchKeys.lat,
                long: searchKeys.long
            };
        }

        url = appendToUrl(url, urlParams);
        $.spinner().start();
        $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            success: function (data) {
                $.spinner().stop();
                updateStoresResults(data);
            }
        });
    });
};

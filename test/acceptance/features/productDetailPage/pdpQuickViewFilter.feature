Feature: Filter for a product and add to cart from Quick View
    As a shopper I want to be able to search for a product,
    filter the results, then add the product to cart using Quick View

@quickview
    Scenario:
        When shopper selects yes or no for tracking consent
        Given shopper searches for category from menu
        And shopper opens product quick view from product display page
        And shopper selects color from Quick View
        And shopper selects size from Quick View
        And shopper adds to cart from Quick View
        Then he is able to see the correct product in cart
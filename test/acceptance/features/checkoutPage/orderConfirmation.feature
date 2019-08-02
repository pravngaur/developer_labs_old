Feature: Order Confirmation And Checkout
    As a shopper, I want to shop, ship, and pay for a product.

    Scenario: Shopper is able to add a product to a cart
        When shopper selects yes or no for tracking consent
        Given Shopper searches for "Elbow Sleeve Ribbed Sweater"
        Then selects size "S"
        Then shopper changes product quantity
        Then he adds the product to cart
        Then shopper selects checkout from cart
        And shopper selects checkout as guest
        And shopper fills out shipping information
        Then shopper proceeds to payment section
        And shopper fills out billing information
        Then shopper places order
        And shopper verifies the order confirmation page
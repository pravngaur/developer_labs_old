Feature: Multiship during checkout
    As a shopper I want to be ship to multiple addresses based on the product

@multiShip
    Scenario: Shopper is able to edit products in their cart
        When shopper selects yes or no for tracking consent
        Given Shopper searches for "Elbow Sleeve Ribbed Sweater"
        Then selects size "S"
        Then he adds the product to cart
        Given Shopper searches for "Modern Striped Dress Shirt"
        Then selects size "16R"
        Then he adds the product to cart
        Then shopper selects checkout from cart
        And shopper selects checkout as guest
        Then shopper ships to more than one address
        Then shopper proceeds to payment section

Feature: Add To Cart
  In order to buy a product
  As a shopper
  I want to be able to add a product to cart

@add_to_cart
  Scenario: Fred is able to add a product to a cart
    Given Fred searches for "Elbow Sleeve Ribbed Sweater"
    And selects size "s"
    When he adds the product to cart 
    Then he is able to see the correct product in cart

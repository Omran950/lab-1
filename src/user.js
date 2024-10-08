/**
 * @class
 * representing the user in e-commerce app.
 */
class User {
  /**
   * Setting the name, password, address and cart=[] of the user.
   * @param {string} name - name of the user
   * @param {string} password - password of the user
   * @param {String} address - The address of the user.
   */
  constructor(name, password, address) {
    this.name = name;
    this.password = password;
    this.address = address;
    this.cart = [];
  }

  /**
   * Adds a product to the cart array.
   * @param {object} product - product object to be add to cart.
   * @param {string} product.name - name of the product
   * @param {number} product.price - price of the product
   */
  // test this function's logic
  addToCart(product) {
    this.cart.push(product);
  }

  /**
   * Calculate the total price for all products in cart
   * @return {number} the cart array total price.
   */
  calculateTotalCartPrice() {
    return this.cart.reduce((accPrice, prd) => accPrice + prd.price, 0);
  }
  /* These are test cases for checkout function:
        1- paymentService methods should be called correctly
        2- delivery Service "shipping" method should be called correctly only if 
          "isVerified" method return true
   */
  /**
   * Creates order with products in cart then ship it only if the payment process was successfully
   *
   * by using methods within 2 service:
   * payment and delivery
   * @param {object} paymentService object represents the payment process
   * @param {function} paymentService.setPaymentInfo opens a new page to input the payment info.
   * @param {function} paymentService.returnBack close the payment page after verify the payment info.
   * @param {function} paymentService.isVerified returns true only if the payment info was correct.
   * @param {object} deliveryService object represents the shipment process
   * @param {function} deliveryService.shipping place the order with parameters: the user's address and the cart products.
   */
  checkout(paymentService, deliveryService) {
    paymentService.setPaymentInfo();
    paymentService.returnBack();
    if (paymentService.isVerified()) {
      deliveryService.shipping(this.address, this.cart);
    }
  }
}

module.exports = User;

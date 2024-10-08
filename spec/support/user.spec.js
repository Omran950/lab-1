const User = require("../../src/user");

describe("User class", function () {
  let user;
  let product1;
  let product2;

  beforeEach(function () {
    user = new User("Ahmed", "111", "cairo");
    product1 = { name: "Product 1", price: 100 };
    product2 = { name: "Product 2", price: 200 };
  });

  describe("addToCart", function () {
    it("should add a product to the cart", function () {
      user.addToCart(product1);
      expect(user.cart.length).toBe(1);
      expect(user.cart[0]).toEqual(product1);
    });

    it("should add multiple products to the cart", function () {
      user.addToCart(product1);
      user.addToCart(product2);
      expect(user.cart.length).toBe(2);
      expect(user.cart).toContain(product1);
      expect(user.cart).toContain(product2);
    });
  });

  describe("calculateTotalCartPrice", function () {
    it("should calculate the total price of products in cart", function () {
      user.addToCart(product1);
      user.addToCart(product2);
      const total = user.calculateTotalCartPrice();
      expect(total).toBe(300);
    });

    it("should return 0 if the cart is empty", function () {
      const total = user.calculateTotalCartPrice();
      expect(total).toBe(0);
    });
  });

  describe("checkout method", function () {
    let paymentService, deliveryService;

    beforeEach(function () {
      paymentService = {
        setPaymentInfo: jasmine.createSpy("setPaymentInfo"),
        returnBack: jasmine.createSpy("returnBack"),
        isVerified: jasmine.createSpy("isVerified").and.returnValue(true),
      };

      deliveryService = {
        shipping: jasmine.createSpy("shipping"),
      };
    });

    it("should call setPaymentInfo and returnBack in paymentService", function () {
      user.checkout(paymentService, deliveryService);
      expect(paymentService.setPaymentInfo).toHaveBeenCalled();
      expect(paymentService.returnBack).toHaveBeenCalled();
    });

    it("should call deliveryService.shipping if paymentService.isVerified returns true", function () {
      user.addToCart(product1);
      user.addToCart(product2);

      user.checkout(paymentService, deliveryService);
      expect(paymentService.isVerified).toHaveBeenCalled();
      expect(deliveryService.shipping).toHaveBeenCalledWith(
        user.address,
        user.cart
      );
    });

    it("should not call deliveryService.shipping if paymentService.isVerified returns false", function () {
      paymentService.isVerified.and.returnValue(false);

      user.checkout(paymentService, deliveryService);
      expect(deliveryService.shipping).not.toHaveBeenCalled();
    });
  });
});

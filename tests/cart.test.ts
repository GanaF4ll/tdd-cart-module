import {
  addProduct,
  myCart,
  getCart,
  removeProduct,
  clearCart,
  updateProduct,
  getProductCount,
  getTotal,
} from "src/cart";
import { describe, expect, it, beforeEach } from "vitest";

const airForce = { id: "1", name: "Air Force", price: 100, quantity: 1 };
const nb530 = { id: "2", name: "NB 530", price: 100, quantity: 2 };

const mockResponse = {
  status: (code: number) => mockResponse,
  json: (data: any) => data,
};

describe("cart module", () => {
  // ? Reset the cart before each test
  beforeEach(() => {
    myCart.length = 0;
  });

  // ? Test adding a product to the cart
  it("should add a product to the cart", () => {
    addProduct(airForce);
    expect(myCart).toEqual([airForce]);
  });

  // ? Test getting the cart content
  it("should get the cart content", () => {
    addProduct(airForce);
    const cart = getCart();
    expect(cart).toEqual([airForce]);
  });

  // ? Test removing a product from the cart
  it("should remove a product from the cart", () => {
    addProduct(airForce);
    removeProduct(airForce.id, mockResponse as any);
    expect(myCart).toEqual([]);
  });

  // ? Test clearing the cart
  it("should clear the cart", () => {
    addProduct(airForce);
    addProduct(nb530);
    clearCart();
    expect(myCart).toEqual([]);
  });

  // ? Test updating a product in the cart
  it("should update a product in the cart", () => {
    addProduct(airForce);
    updateProduct(
      airForce.id,
      { ...airForce, quantity: 2 },
      mockResponse as any
    );
    expect(myCart).toEqual([{ ...airForce, quantity: 2 }]);
  });

  // ? Test getting the total number of products in the cart
  it("should get the total number of products in the cart", () => {
    addProduct(airForce);
    addProduct(nb530);
    expect(getProductCount()).toBe(3);
  });

  // ? Test getting the total price of the cart
  it("should get the total price of the cart", () => {
    addProduct(airForce);
    addProduct(nb530);
    expect(getTotal()).toBe(300);
  });
});

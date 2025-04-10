import { Request, Response } from "express";
import { z } from "zod";

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  quantity: z.number(),
});

export const myCart: Product[] = [];

/**
 * Adds a product to the cart
 * @param {Product | Request} product - The product to add or Express Request object
 * @param {Response} [res] - Optional Express Response object for HTTP context
 * @throws {Error} If the product is invalid according to the schema
 */
export const addProduct = (product: Product | Request, res?: Response) => {
  if (res) {
    const request = product as Request;
    const productToAdd = request.body;
    if (!productToAdd) {
      res.status(400).json({ error: "Product is required" });
      return;
    }
    try {
      productSchema.parse(productToAdd);
    } catch (e: any) {
      res.status(400).json({ error: e.errors });
      return;
    }

    myCart.push(productToAdd);
    res.status(201).json(productToAdd);
  } else {
    const parsedProduct = productSchema.parse(product);
    myCart.push(parsedProduct);
  }
};

/**
 * Retrieves all products in the cart
 * @returns {Product[]} Array of products in the cart
 */
export const getCart = () => {
  return myCart;
};

/**
 * Removes a product from the cart by its ID
 * @param {string} id - The ID of the product to remove
 * @param {Response} res - Express Response object
 * @returns {void}
 */
export const removeProduct = (id: string, res: Response) => {
  const index = myCart.findIndex((product) => product.id === id);
  if (index !== -1) {
    myCart.splice(index, 1);
  }
  res.status(200).json({ message: "Product removed from cart" });
};

/**
 * Clears all products from the cart
 * @returns {void}
 */
export const clearCart = () => {
  myCart.length = 0;
};

/**
 * Updates a product in the cart
 * @param {string} id - The ID of the product to update
 * @param {Product} product - The updated product data
 * @param {Response} res - Express Response object
 * @throws {Error} If the product is invalid according to the schema
 * @returns {void}
 */
export const updateProduct = (id: string, product: Product, res: Response) => {
  const parsedProduct = productSchema.parse(product);
  const index = myCart.findIndex((product) => product.id === id);
  if (index !== -1) {
    myCart[index] = parsedProduct;
  }
  res.status(200).json({ message: "Product updated in cart" });
};

/**
 * Calculates the total number of products in the cart
 * @returns {number} Total quantity of all products in the cart
 */
export const getProductCount = (): number => {
  return myCart.reduce((total, product) => total + product.quantity, 0);
};

/**
 * Calculates the total price of all products in the cart
 * @returns {number} Total price of all products (price * quantity)
 */
export const getTotal = (): number => {
  return myCart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
};

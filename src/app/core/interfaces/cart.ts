import { BaseProduct } from "./product"; // adjust import path as needed

// ==========================================
// Cart Entities
// ==========================================

/** A single product entry inside the cart */
export interface CartProduct {
  count: number;
  _id: string;
  product: BaseProduct; // string by default; BaseProduct when populated via ?populate=...
  price: number;
}

/** The cart document itself */
export interface Cart {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

// ==========================================
// API Response Wrappers
// ==========================================

/** Response wrapper for POST /api/v1/cart (add to cart) */
export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: Cart;
}

/** Response wrapper for GET /api/v1/cart (get logged user cart) */
export interface GetCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: Cart;   // note: GET cart usually does NOT include cartId at the root
}

/** Response wrapper for PUT /api/v1/cart/:id (update quantity) */
export interface UpdateCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  data: Cart;
}

/** Response wrapper for DELETE /api/v1/cart (clear cart) */
export interface ClearCartResponse {
  message: string;
}
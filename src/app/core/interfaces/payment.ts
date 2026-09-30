export interface Payment {
}
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface CheckoutRequest {
  shippingAddress: ShippingAddress;
}
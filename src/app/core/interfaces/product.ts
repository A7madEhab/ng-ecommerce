export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface User {
  _id: string;
  name: string;
}

export interface Review {
  _id: string;
  review?: string;
  rating: number;
  product: string;
  user: User;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// ==========================================
// Product Entities
// ==========================================

export interface BaseProduct {
  _id: string;
  id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  images: string[];
  sold: number;
  ratingsQuantity: number;
  ratingsAverage: number;
  category: Category;
  subcategory: Subcategory[];
  brand: Brand;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

/** Product details returned when fetching a single product by ID */
export interface ProductDetails extends BaseProduct {
  reviews: Review[];
}

// ==========================================
// API Response Wrappers
// ==========================================

export interface PaginationMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
  prevPage?: number;
}

/** Response wrapper for GET /api/v1/products */
export interface ProductsListResponse {
  results: number;
  metadata: PaginationMetadata;
  data: BaseProduct[];
}

/** Response wrapper for GET /api/v1/products/:id */
export interface SingleProductResponse {
  data: ProductDetails;
}
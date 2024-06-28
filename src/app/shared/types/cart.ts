import { ProductDetails } from './apiProduct';

export interface Cart {
  _id: string;
  userId: string;
  createdAt: string;
  total: {
    price: {
      current: number;
      beforeDiscount: number;
    };
    quantity: number;
    products: number;
  };
  products: CartProduct[];
}

export interface CartProduct {
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
  productId: number;
}

export interface CartProductDetails extends ProductDetails {
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
}

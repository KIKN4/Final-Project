export interface ApiProduct {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  price: Price;
  category: Category;
  issueDate: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
}

export interface ProductDetails extends ApiProduct {
  ratings: Rating[];
}

export interface Price {
  current: number;
  currency: string;
  beforeDiscount: number;
  discountPercentage: number;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Rating {
  userId: string;
  value: number;
  createdAt: string;
}

export interface GetApiResponse {
  products: ApiProduct[];
  total: number;
  page: number;
  skip: number;
}

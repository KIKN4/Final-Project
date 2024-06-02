export interface ApiProduct {
  price: Price;
  category: Category;
  _id: string;
  title: string;
  description: string;
  issueDate: string;
  thumbnail: string;
  stock: number;
  rating: number;
  brand: string;
  warranty: number;
  images: string[];
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

export interface GetApiResponse {
  products: ApiProduct[];
  total: number;
  page: number;
  skip: number;
}

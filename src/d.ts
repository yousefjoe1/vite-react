export interface ProductItem {
  _id: string;
  img: string;
  name: string;
  size: string;
  color: string;
  price: number;
  discount: number;
  images: string[]; // array of strings
  rate: number;
}

export interface ProductInfo {
  _id: string;
  name: string;
  details: string;
  price: number;
  discount: number;
  rate: string;
  dress: string;
  category: string;
  sub_category: string;
  colors: string[];
  sizes: string[];
  images: string[];
}

export type Inputs = {
  name: string;
  email: string;
  password: string;
  phone: string
};

export interface CartItem {
  product: ProductItem;
  _id: string;
  count: string;
}

export interface Status {
  isLoading: boolean;
  isRefetching: boolean;
  isError: boolean;
}

export interface ProductsCartObject {
  data: CartItem[];
  total: number;
}

export interface ReviewData {
  id: number;
  name: string;
  rating: number;
  date: string;
  content: string;
}


export interface BrowsBy {
  name: string;
  imageUrl: string;
  size: string;
}


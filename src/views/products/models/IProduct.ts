export interface IProduct{
  id: number;
  sku: number;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
  name: string;
}

export interface IProductImage{
  name: string,
  src: string
}

export interface IProductInput {
  name: string;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
}
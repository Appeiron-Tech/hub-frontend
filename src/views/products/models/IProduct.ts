export interface IProduct{
  id: number;
  sku: number;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
  name: string;
  ean? : number;
  categoryId?: number;
  pos: number;
  variantId? : number;
  createdAt: number;
}

export interface IProductImage{
  name: string,
  src: string
}

export interface IProductSave {
  name: string;
  images?: Array<IProductImage>;
  description?: string;
  price: number;
  isActive: boolean;
}

export interface ICategory {
  id: number;
  category: string;
  description?: string;
  pos: number;
  isActive: boolean;
  createdAt: number;
}

export interface IVariantOptions{
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  variantId: number;
  price: number;
  variant: number
  createdAt: number;
}
export interface IVariant{
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: number
}
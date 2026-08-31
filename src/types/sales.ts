export interface Product {
  productId: number;
  name: string;
  price: number;
}

export interface CreateProductData {
  name: string;
  price: number;
}

export interface Client {
  clientId: number;
  name: string;
  cpf: string;
  birthDate?: string;
  email?: string;
  telefone?: string;
}

export interface CreateClientDTO {
  name: string;
  cpf: string;
  birthDate?: string;
  email?: string;
  telefone?: string;
}

export interface SaleItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateSaleDTO {
  clientId: number;
  saleDate: string;
  items: { productId: number; quantity: number }[];
}

export interface SaleItemResponse {
  saleItemId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  productName: string;
}

export interface Sale {
  saleId: number;
  clientId: number;
  saleDate: string;
  priceTotal: number;
  clientName: string;
  items: SaleItemResponse[];
}
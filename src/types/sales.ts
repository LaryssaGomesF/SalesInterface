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

export interface SaleItem {
  saleItemId: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  saleId: number;
  clientId: number;
  clientName: string;
  saleDate: string;
  priceTotal: number;
  items: SaleItem[];
}
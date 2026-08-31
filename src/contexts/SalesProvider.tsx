import { createContext, useState, useEffect, type ReactNode, useContext } from 'react';
import { api } from '../services/api';
import {type Product, type CreateProductData, type Client, type Sale } from '../types/sales';

interface SalesContextData {
  products: Product[];
  loadingProducts: boolean;
  getProducts: () => Promise<void>;
  createProduct: (data: CreateProductData) => Promise<void>;

  clients: Client[];
  loadingClients: boolean;
  getClients: () => Promise<void>;

  sales: Sale[];
  loadingSales: boolean;
  getSales: () => Promise<void>;
}

const SalesContext = createContext<SalesContextData>({} as SalesContextData);

export function SalesProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const [clients, setClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  const [sales, setSales] = useState<Sale[]>([]);
  const [loadingSales, setLoadingSales] = useState(false);

  // --- PRODUTOS ---
  const getProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await api.get<Product[]>('/Product');
      setProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const createProduct = async (productData: CreateProductData) => {
    try {
      await api.post('/Product', productData);
      await getProducts(); // Atualiza a lista após criar
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      throw error;
    }
  };

  // --- CLIENTES ---
  const getClients = async () => {
    setLoadingClients(true);
    try {
      const data = await api.get<Client[]>('/Client');
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    } finally {
      setLoadingClients(false);
    }
  };

  // --- VENDAS ---
  const getSales = async () => {
    setLoadingSales(true);
    try {
      const data = await api.get<Sale[]>('/Sale');
      setSales(data);
    } catch (error) {
      console.error('Erro ao buscar vendas:', error);
    } finally {
      setLoadingSales(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      getProducts();
      getClients();
      getSales();
    }

    fetchData();
    
  }, []);

  return (
    <SalesContext.Provider
      value={{
        products,
        loadingProducts,
        getProducts,
        createProduct,
        clients,
        loadingClients,
        getClients,
        sales,
        loadingSales,
        getSales,
      }}
    >
      {children}
    </SalesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSales = () => useContext(SalesContext);
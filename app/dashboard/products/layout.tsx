
'use client';
import { createContext, useState, ReactNode } from 'react';


interface Data {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string;
}


interface ProductContextType {
  productData: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}


export const ProductContext = createContext<ProductContextType>({
  productData: {
    id: '',
    name: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: '',
  },
  setData: () => {},
});


export default function ProductProvider({ children }: { children: ReactNode }) {
  const [productData, setData] = useState<Data>({
    id: '',
    name: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    stock: 0,
    images: '',
  });

  return (
    <ProductContext.Provider value={{ productData, setData }}>
      <section>{children}</section>
    </ProductContext.Provider>
  );
}



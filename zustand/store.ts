    
import { create } from 'zustand';

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: string;
    category: string;
    stock: string;
    images: string;
    createdAt: Date;
}

interface StoreState {
    products: Product[];
    addProduct: (newProduct: Product) => void;
    removeProduct: (id: string) => void;
    clearProducts: () => void;
}

const useStore = create<StoreState>((set) => ({
    products: [],
    addProduct: (newProduct) =>
        set((state) => ({ products: [...state.products, newProduct] })),
    removeProduct: (id) =>
        set((state) => ({
        products: state.products.filter((item) => item._id !== id),
        })),
    clearProducts: () => set({ products: [] }),
    }));

export default useStore;

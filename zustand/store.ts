    

import { create } from 'zustand';

interface Product {
    _id: string;
    name: string;
    title: string;
    description: string;
    price: number;
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
    addProduct: (newProduct) => {
        set((state) => {
            const exists = state.products.find((product) => product._id === newProduct._id);
            if (exists) {
            alert("This product was added before");
            return state;
            }
            return {
            products: [...state.products, newProduct],
            };
        });
    },
    // doubleProduct: () => set(),
    removeProduct: (id) =>
        set((state) => ({
        products: state.products.filter((item) => item._id !== id),
        })),
    clearProducts: () => set({ products: [] }),
    }));

export default useStore;

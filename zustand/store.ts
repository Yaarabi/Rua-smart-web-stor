    

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
    quantity: number;
}

interface StoreState {
    products: Product[];
    addProduct: (newProduct: Product) => void;
    removeProduct: (id: string) => void;
    clearProducts: () => void;
    incrementQuantity: (id: string) => void;
    decrementQuantity: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
    products: [],
    addProduct: (newProduct) => {
        set((state) => {
            const exists = state.products.find((product) => product._id === newProduct._id);
            console.log(state.products)
            if (exists) {
            alert("This product was added before");
            return state;
            }
            return {
            products: [...state.products, newProduct],
            };
        });
    },
    removeProduct: (id) =>
        set((state) => ({
        products: state.products.filter((item) => item._id !== id),
        })),
    clearProducts: () => set({ products: [] }),

    incrementQuantity: (id) =>
        set((state) => ({
            products: state.products.map((p) =>
                p._id === id ? { ...p, quantity: p.quantity + 1 } : p
        ),
    })),
    decrementQuantity: (id) =>
        set((state) => ({
            products: state.products.map((p) =>
                p._id === id ? (p.quantity>0 ?{ ...p, quantity: p.quantity - 1 } : { ...p, quantity: 0 } ) : p
        ),
    })),
    }));

export const useQuantity = () => {
        const products = useStore((state) => state.products);
  return products.reduce((acc, ele) => acc + ele.quantity, 0);
};

export const useTotal = () => {
        const products = useStore((state) => state.products);
  return products.reduce((acc, ele) => acc + ele.price * ele.quantity, 0);
};

export default useStore;

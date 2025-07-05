
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface Form {
        name: string;
        title: string,
        description: string;
        price: string;
        category: string;
        stock: string;
        images: string;
        }
interface UpdatePayload {
        product: Form;
        id: string;
    }

const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct: Form) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct),
        });

        if (!res.ok) throw new Error("Failed to create product");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        alert("Product was created successfully")
        },
    });
};

const usePutParoduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ product, id }: UpdatePayload) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product),
        });

        if (!res.ok) throw new Error("Failed to Update this product");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        alert("Product was updated successfully")
        },
    });
}

const useDeleteProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id : string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`, {
            method: "DELETE"
        });
            if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        },
    });


}

const useGetProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id : string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?id=${id}`, {
            method: "GET"
        });
            if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });


}

const useGetCategory = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (category : string) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=${category}`, {
            method: "GET"
        });
            if (!res.ok) throw new Error("Failed to delete product");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["category"] });
        },
    });


}

export { useDeleteProduct, usePutParoduct, useCreateProduct, useGetProduct, useGetCategory }

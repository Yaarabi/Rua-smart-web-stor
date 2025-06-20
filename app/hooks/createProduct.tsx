
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface Form {
        name: string;
        description: string;
        price: string;
        category: string;
        stock: string;
        ratings: string;
        images: string;
        }

const useCreateProduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newProduct: Form) => {
        const res = await fetch("http://localhost:3000/api/products", {
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

export default useCreateProduct

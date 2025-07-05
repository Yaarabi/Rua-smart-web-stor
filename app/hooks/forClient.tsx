import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";


export const useGetusers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000'}/api/users`);
            if (!res.ok) throw new Error("Failed to fetch users");
            return res.json();
        }
    });
};

export const useCreateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newCustomer: {
            username: string;
            email: string;
            password: string;
            phone?: string;
            address?: string;
        }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000'}/api/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCustomer),
            });
            if (!res.ok) throw new Error("Failed to create customer");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (updateData: {
            userId: string;
            totalSpent?: number;
            totalOrders?: number;
            address?: string;
        }) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000'}/api/users`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updateData),
            });
            if (!res.ok) throw new Error("Failed to update customer");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000'}/api/users/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete customer");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

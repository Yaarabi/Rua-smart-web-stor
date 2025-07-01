
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`http://localhost:3000/api/customers/${id}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete customer");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["customers"] });
        },
    });
};

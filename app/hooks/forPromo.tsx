
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Promotion {
    _id: string;
    title: string;
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
}

export interface PromotionForm {
    title: string;
    status: string;
    startDate: string;
    endDate: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/promo`;

export const useCreatePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newPromotion: PromotionForm) => {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPromotion),
            });

            if (!res.ok) throw new Error("Failed to create promotion");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
            alert("Promotion was created successfully");
        },
    });
};

export const useUpdatePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ promotion, id }: { promotion: PromotionForm; id: string }) => {
            const res = await fetch(`${API_URL}?id=${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(promotion),
            });

            if (!res.ok) throw new Error("Failed to update promotion");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
            alert("Promotion was updated successfully");
        },
    });
};

export const useDeletePromotion = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_URL}?id=${id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Failed to delete promotion");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["promotions"] });
            alert("Promotion was deleted successfully");
        },
    });
};

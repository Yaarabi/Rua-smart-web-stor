

import { useMutation, useQueryClient } from "@tanstack/react-query";


interface OrderItem {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    shippingAddress: {
        city: string;
        country: string;
    };
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    createdAt: Date;
}
interface UpdatePayload {
        order: Order;
        id: string;
    }

const useCreateOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newOrder: Order) => {
        const res = await fetch("http://localhost:3000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newOrder),
        });

        if (!res.ok) throw new Error("Failed to create Order");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
        alert("Order was created successfully")
        },
    });
};

const usePutParoduct = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ order, id }: UpdatePayload) => {
        const res = await fetch(`http://localhost:3000/api/orders?id=${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order),
        });

        if (!res.ok) throw new Error("Failed to Update this Order");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
        alert("Order was updated successfully")
        },
    });
}

const useDeleteOrder = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id : string) => {
        const res = await fetch(`http://localhost:3000/api/orders?id=${id}`, {
            method: "DELETE"
        });
            if (!res.ok) throw new Error("Failed to delete Order");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["Orders"] });
        },
    });


}

export { useDeleteOrder, usePutParoduct, useCreateOrder }

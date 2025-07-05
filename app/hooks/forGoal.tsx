import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Goal {
    _id: string;
    title: string;
    insights: string[];
    createdAt: string;
    updatedAt: string;
}

export interface GoalForm {
    title: string;
    insights: string[];
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/goals`;

export const useGetGoals = () => {
    return useQuery({
        queryKey: ["goals"],
        queryFn: async () => {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Failed to fetch goals");
            return res.json();
        },
    });
};

export const useCreateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newGoal: GoalForm) => {
            const res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newGoal),
            });

            if (!res.ok) throw new Error("Failed to create goal");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            alert("Goal was created successfully");
        },
    });
};

export const useUpdateGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, goal }: { id: string; goal: GoalForm }) => {
            const res = await fetch(`${API_URL}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...goal }),
            });

            if (!res.ok) throw new Error("Failed to update goal");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            alert("Goal was updated successfully");
        },
    });
};

export const useDeleteGoal = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_URL}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });

            if (!res.ok) throw new Error("Failed to delete goal");
            return res.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["goals"] });
            alert("Goal was deleted successfully");
        },
    });
};

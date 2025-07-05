
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface Blog {
    _id: string;
    title: string;
    content: string;
    image?: string | null;
    category: string;
    views: number;
    createdAt: string;
    updatedAt: string;
}

export interface BlogForm {
    title: string;
    content: string;
    image?: string | null;
    category?: string;
}

// interface UpdateBlogPayload {
//     blog: BlogForm;
//     id: string;
// }

const API_URL = `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'}/api/blogs`;

export const useCreateBlog = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newBlog: BlogForm) => {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newBlog),
        });

        if (!res.ok) throw new Error("Failed to create blog");
        return res.json();
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
        alert("Blog was created successfully");
        },
    });
};

// export const useUpdateBlog = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async ({ blog, id }: UpdateBlogPayload) => {
//         const res = await fetch(`${API_URL}?id=${id}`, {
//             method: "PUT",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(blog),
//         });

//         if (!res.ok) throw new Error("Failed to update blog");
//         return res.json();
//         },
//         onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["blogs"] });
//         alert("Blog was updated successfully");
//         },
//     });
// };

// export const useDeleteBlog = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: async (id: string) => {
//         const res = await fetch(`${API_URL}?id=${id}`, {
//             method: "DELETE",
//         });

//         if (!res.ok) throw new Error("Failed to delete blog");
//         return res.json();
//         },
//         onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: ["blogs"] });
//         alert("Blog was deleted successfully");
//         },
//     });
// };






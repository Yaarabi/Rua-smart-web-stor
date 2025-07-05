
import React from 'react';
import Image from 'next/image';

interface BlogType {
    _id: string;
    title: string;
    content: string;
    image?: string | null;
    category: string;
    views: number;
    createdAt: string;
}
const Blogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ? `https://${process.env.NEXT_PUBLIC_BASE_URL}` : 'http://localhost:3000'}/api/blogs`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch blogs');
    }

    const blogs: BlogType[] = await res.json();

    return (
        <main className="max-w-5xl min-h-screen mx-auto p-6">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Blog Posts</h1>
        {blogs.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No blogs available.</p>
        ) : (
            <ul className="space-y-8">
            {blogs.map(({ _id, title, content, image, category, views, createdAt }) => (
                <li key={_id}>
                <article className="border border-gray-300 rounded-lg p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
                    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                    Category: <span className="font-medium">{category}</span> | Views: {views} | Published:{' '}
                    {new Date(createdAt).toLocaleDateString()}
                    </p>
                    {image && (
                    <div className="relative w-full h-64 mb-4 rounded-md overflow-hidden">
                        <Image
                        src={image}
                        alt={title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={false}
                        sizes="(max-width: 768px) 100vw, 768px"
                        />
                    </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300">{content}</p>
                </article>
                </li>
            ))}
            </ul>
        )}
        </main>
    );
};

export default Blogs;


import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/blog'; 

connectDB();

export async function GET() {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error fetching blogs.' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const { title, content, image } = await request.json();

        if (!title || !content) {
            return NextResponse.json({ message: 'Title and content are required.' }, { status: 400 });
        }

        const newBlog = await Blog.create({ title, content, image });

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error creating blog.' }, { status: 500 });
    }
}

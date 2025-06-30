
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Blog from '@/models/blog';

connectDB();

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const data = await request.json();

        const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });

        if (!updatedBlog) {
            return NextResponse.json({ message: 'Blog not found.' }, { status: 404 });
        }

        return NextResponse.json(updatedBlog, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error updating blog.' }, { status: 500 });
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return NextResponse.json({ message: 'Blog not found.' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Blog deleted successfully.' }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error deleting blog.' }, { status: 500 });
    }
}

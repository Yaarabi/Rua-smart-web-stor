import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/models/blog";

    connectDB();

export async function GET() {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        return NextResponse.json(blogs, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error fetching blogs." }, { status: 500 });
    }
    }

    export async function POST(request: NextRequest) {
    try {
        const { title, content, image } = await request.json();

        if (!title || !content) {
        return NextResponse.json({ message: "Title and content are required." }, { status: 400 });
        }

        const newBlog = await Blog.create({ title, content, image });

        return NextResponse.json(newBlog, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error creating blog." }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const { id, title, content, image } = await request.json();

        if (!id) {
        return NextResponse.json({ message: "Blog ID is required for update." }, { status: 400 });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
        return NextResponse.json({ message: "Blog not found." }, { status: 404 });
        }

        if (title !== undefined) blog.title = title;
        if (content !== undefined) blog.content = content;
        if (image !== undefined) blog.image = image;

        await blog.save();

        return NextResponse.json(blog, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error updating blog." }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
        return NextResponse.json({ message: "Blog ID is required for deletion." }, { status: 400 });
        }

        const deleted = await Blog.findByIdAndDelete(id);

        if (!deleted) {
        return NextResponse.json({ message: "Blog not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Blog deleted successfully." }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error deleting blog." }, { status: 500 });
    }
}

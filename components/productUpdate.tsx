
import { useState } from "react";
import { usePutParoduct } from "@/app/hooks/createProduct";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import Posting from "./btnPatient";


interface Product {
        _id:string;
        name: string;
        title: string,
        description: string;
        price: string;
        category: string;
        stock: string;
        images: string;
        }

interface Form {
        name: string;
        title: string,
        description: string;
        price: string;
        category: string;
        stock: string;
        images: string;
        }


    


const ProductUpdate = ({ product } : { product: Product }) => {

    const [ toUpdate, setToUpdate ] = useState(false)
    const [form, setForm] = useState<Form>({
            name: product.name,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category,
            stock: product.stock,
            images: product.images,
        });

        const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
        ) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === "images" && files && files.length > 0) {
            const reader = new FileReader();
            const file = files[0];

            reader.onloadend = () => {
            const base64String = reader.result?.toString().split(",")[1];
            if (base64String) {
                setForm((prev) => ({ ...prev, images: base64String }));
            }
            };

            reader.onerror = (error) => {
            console.error("Error encoding image:", error);
            };

            reader.readAsDataURL(file);
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
};
    const putProduct = usePutParoduct()
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
            e.preventDefault();
            putProduct.mutate({ product: form, id: product._id });
            if(putProduct.isSuccess){
                setToUpdate(false)
            }
        };
        
    


    return (
    <>
        { !toUpdate && <FaEdit size={18} onClick={()=> setToUpdate(true)}/> }
        { toUpdate && <div className="max-w-xl mx-auto bg-gray-600 p-8 w-full fixed top-4 left-2/5">
            <FaArrowLeft className="text-xl" onClick={()=> setToUpdate(false)} />
            <form onSubmit={handleSubmit} className="space-y-5 mt-6">
                <h2 className="text-2xl font-semibold text-white">Add New Product</h2>
    
                <div>
                <label htmlFor="name" className="block text-sm text-gray-300 mb-1">
                    Product Name
                </label>
                <input
                    id="name"
                    name="title"
                    placeholder="e.g., Rua Smart Watch"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>
    
                <div>
                <label htmlFor="description" className="block text-sm text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    placeholder="Brief product description..."
                    value={form.description}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md resize-none h-24 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>
    
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="price" className="block text-sm text-gray-300 mb-1">
                    Price
                    </label>
                    <input
                    id="price"
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
    
                <div>
                    <label htmlFor="stock" className="block text-sm text-gray-300 mb-1">
                    Stock
                    </label>
                    <input
                    id="stock"
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
    
                <div>
                    <label htmlFor="ratings" className="block text-sm text-gray-300 mb-1">
                    Unique Name
                    </label>
                    <input
                    id="ratings"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                
                <div>
                    <label htmlFor="category" className="block text-sm text-gray-300 mb-1">
                    Category
                    </label>
                    <input
                    id="category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>
                </div>
    
                <div>
                <label htmlFor="images" className="block text-sm text-gray-300 mb-1">
                    Image URLs (comma-separated)
                </label>
                <input
                    type="file"
                    name="images"
                    placeholder="https://..., https://..."
                    // value={product.images}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                </div>
    
                <div className="flex justify-end space-x-4">
                    <button             
                    type="button"
                    className="px-6 py-2 bg-gray-200 text-indigo-600 rounded-md hover:bg-gray-300 transition flex items-center"
                    disabled={!form.title || !form.description}
                    
                    >
                        Try by AI
                        {/* { isRery ? <Posting/> : "Re-Try" } */}
                    </button>
                    <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition flex items-center"
                    disabled={!product.title || !product.description || !product.price || !product.stock }
                    >
                    {putProduct.isPending ? <Posting/>  : "Update"}
                    </button>
                </div>
            </form>
            </div>}
        </>
)
}

export default ProductUpdate

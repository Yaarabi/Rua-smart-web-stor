
import mongoose from "mongoose"


const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    images: [String],
    ratings: Number,
    createdAt: Date,
})

const Product = mongoose.model("Product", productSchema);

export default Product
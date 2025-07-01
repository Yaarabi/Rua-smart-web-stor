
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        require: false,
        default: null
    },
    password: {
        type: String,
        required: true,
        minlength: 6 
    },
    address: {
        type: String,
        default: null
    },
    role: {
        type: String,
        default: "client"
    },
    createdAt: Date,
    updatedAt: Date,
})

const Client = mongoose.models.Client || mongoose.model('Client', userSchema);


export default Client;
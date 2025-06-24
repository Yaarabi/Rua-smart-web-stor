import mongoose, { Schema } from 'mongoose';


    const OrderSchema: Schema = new Schema(
    {
        userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'client',
        default:"guest"
        },
        items: [
        {
            productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Product',
            },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
        },
        ],
        shippingAddress: {
        city: { type: String, required: true },
        country: { type: String, required: true },
        },
        totalPrice: { type: Number, required: true },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, default: false },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true, 
    }
);

export default mongoose.model('Order', OrderSchema);

import mongoose from 'mongoose';

// A schema (model) of our products of the Database
const productSchema = mongoose.Schema({
    name: String,
    description: String,
    image: String,
    type: [String],
    priceNXG: Number,
    priceBPX: Number,
    used: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ProductMessage = mongoose.model('ProductMessage', productSchema);

export default ProductMessage;
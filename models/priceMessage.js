import mongoose from 'mongoose';

// A schema (model) of our prices of the Database
const priceSchema = mongoose.Schema({
    price: Number,
    type: String
}, { timestamps: true });

const PriceMessage = mongoose.model('PriceMessage', priceSchema);

export default PriceMessage;
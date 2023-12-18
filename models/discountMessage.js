import mongoose from 'mongoose';

// A schema (model) of our prices of the Database
const discountSchema = mongoose.Schema({
    discount: String
}, { timestamps: true });

const DiscountMessage = mongoose.model('DiscountMessage', discountSchema);

export default DiscountMessage;
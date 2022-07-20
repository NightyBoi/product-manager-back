import mongoose from 'mongoose';

// A schema (model) of our prices of the Database
const userSchema = mongoose.Schema({
    password: String
}, { timestamps: true });

const UserMessage = mongoose.model('UserMessage', userSchema);

export default UserMessage;
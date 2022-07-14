import ProductMessage from "../models/productMessage.js";
import PriceMessage from "../models/priceMessage.js";

export const getProducts = async(req, res) => {
    try {
        const productMessages = await ProductMessage.find();

        console.log(productMessages);

        res.status(200).json(productMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPricesNXG = async(req, res) => {
    try {
        const priceMessages = await PriceMessage.find({ type: "NXG" });

        console.log(priceMessages);

        res.status(200).json(priceMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPricesBPX = async(req, res) => {
    try {
        const priceMessages = await PriceMessage.find({ type: "BPX" });

        console.log(priceMessages);

        res.status(200).json(priceMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPricesALL = async(req, res) => {
    try {
        const priceMessages = await PriceMessage.find();

        console.log(priceMessages);

        res.status(200).json(priceMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createProduct = async(req, res) => {
    const product = req.body;


    const newProduct = new ProductMessage(product);

    try {
        await newProduct.save();

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const createPrice = async(req, res) => {
    const price = req.body;

    const newPrice = new PriceMessage(price);

    try {
        await newPrice.save();

        res.status(201).json(newPrice);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const deleteProduct = async(req, res) => {

    var uid = req.params.id.toString();

    try {
        const productMessages = await ProductMessage.findByIdAndDelete(uid);

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const deletePrice = async(req, res) => {

    var uid = req.params.id.toString();

    try {
        const priceMessages = await PriceMessage.findByIdAndDelete(uid);

        res.status(201).json(priceMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const updateProduct = async(req, res) => {
    const product = req.body;
    var uid = req.params.id.toString();

    try {
        const productMessages = await ProductMessage.findByIdAndUpdate(uid, product);

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const updatePricesNXG = async(req, res) => {
    const newPrice = req.body.newPrice;
    const oldPrice = req.body.oldPrice;

    try {
        const productMessages = await ProductMessage.updateMany({ priceNXG: oldPrice }, { priceNXG: newPrice });
        const priceMessages = await PriceMessage.updateOne({ price: oldPrice, type: "NXG" }, { price: newPrice });

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(491).json({ message: error.message });
    }
}

export const updatePricesBPX = async(req, res) => {
    const newPrice = req.body.newPrice;
    const oldPrice = req.body.oldPrice;

    try {
        const productMessages = await ProductMessage.updateMany({ priceBPX: oldPrice }, { priceBPX: newPrice });
        const priceMessages = await PriceMessage.updateOne({ price: oldPrice, type: "BPX" }, { price: newPrice });

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(491).json({ message: error.message });
    }
}
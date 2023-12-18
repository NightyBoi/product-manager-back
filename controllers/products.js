import ProductMessage from "../models/productMessage.js";
import PriceMessage from "../models/priceMessage.js";
import UserMessage from "../models/userMessage.js";
import DiscountMessage from "../models/discountMessage.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getProducts = async(req, res) => {
    try {
        const productMessages = await ProductMessage.find();

        console.log(productMessages);

        res.status(200).json(productMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDiscounts = async(req, res) => {
    try {
        const discountMessages = await DiscountMessage.find();

        console.log(discountMessages);

        res.status(200).json(discountMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getDiscountsObject = async(req, res) => {
    try {
        const discountMessages = await DiscountMessage.find();

        discountMessages.sort((function(a, b) {
            return a.createdAt - b.createdAt;
        }));

        console.log(discountMessages);

        res.send("var discountMessages = " + JSON.stringify(discountMessages) + ";");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUnusedProducts = async(req, res) => {
    try {
        const productMessages = await ProductMessage.find({ used: false });

        console.log(productMessages);

        res.status(200).json(productMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const setProductsUse = async(req, res) => {
    const use = req.body;

    try {
        const productMessages = await ProductMessage.updateMany({}, { used: false });

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const setProductsUseByType = async(req, res) => {
    const type = req.body.type;
    console.log(type);
    //const use = req.body;

    try {
        const productMessages = await ProductMessage.updateMany({ type: type }, { used: false });

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
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

export const getPricesNXGObject = async(req, res) => {
    try {
        const priceMessages = await PriceMessage.find({ type: "NXG" });

        priceMessages.sort((function(a, b) {
            return a.price - b.price;
        }));

        console.log(priceMessages);

        res.send("var priceMessages = " + JSON.stringify(priceMessages) + ";");
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

export const getPricesBPXObject = async(req, res) => {
    try {
        const priceMessages = await PriceMessage.find({ type: "BPX" });

        priceMessages.sort((function(a, b) {
            return a.price - b.price;
        }));

        console.log(priceMessages);

        res.send("var priceMessages = " + JSON.stringify(priceMessages) + ";");
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

export const createDiscount = async(req, res) => {
    const discount = req.body;

    const newDiscount = new DiscountMessage(discount);

    try {
        await newDiscount.save();

        res.status(201).json(newDiscount);
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

export const deleteDiscount = async(req, res) => {

    var uid = req.params.id.toString();

    try {
        const discountMessages = await DiscountMessage.findByIdAndDelete(uid);

        res.status(201).json(discountMessages);
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

export const updateDiscount = async(req, res) => {
    const discount = req.body;
    var uid = req.params.id.toString();

    try {
        const discountMessages = await DiscountMessage.findByIdAndUpdate(uid, discount);

        res.status(201).json(discountMessages);
    } catch (error) {
        res.status(490).json({ message: error.message });
    }
}

export const updateProductUse = async(req, res) => {
    const newUse = req.body.used;
    var uid = req.params.id.toString();

    try {
        const productMessages = await ProductMessage.findByIdAndUpdate(uid, { used: newUse });

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

export const loginUser = async(req, res) => {
    const password = req.body.password;

    UserMessage.findOne({ _id: ["62d5c4afe6554599bec5e9e6"] }).then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function(err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    };
                    if (result) {
                        let token = jwt.sign({ user_id: user._id }, 'verySecretValue', { expiresIn: '8h' });
                        res.json({
                            message: "Login successful!",
                            token: token
                        })
                    } else {
                        res.json({
                            message: "Password doesn't exist."
                        })
                    }

                });
            }
        })
        // try {
        //     newUser.save();

    //     res.status(201).json(newUser);
    // } catch (error) {
    //     res.status(490).json({ message: error.message });
    // }
}

export const loginGuest = async(req, res) => {
    const password = req.body.password;

    UserMessage.findOne({ _id: ["645007875150443c4e1f3e49"] }).then(user => {
        if (user) {
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {
                    res.json({
                        error: err
                    })
                };
                if (result) {
                    let token = jwt.sign({ user_id: user._id }, 'verySecretValue', { expiresIn: '8h' });
                    res.json({
                        message: "Login successful!",
                        token: token
                    })
                } else {
                    res.json({
                        message: "Password doesn't exist."
                    })
                }

            });
        }
    })
}


// export const registerUser = async(req, res) => {
//     bcrypt.hash(req.body.password, 10, function(err, hashed) {
//         if (err) {
//             res.send(err);
//         }
//         const newUser = new UserMessage({ password: hashed });

//         try {
//             newUser.save();

//             res.status(201).json(newUser);
//         } catch (error) {
//             res.status(490).json({ message: error.message });
//         }
//     });
// }
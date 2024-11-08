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
        const priceMessages = await PriceMessage.find({ type: "NXG" }).lean();
        const discountMessages = await DiscountMessage.find().lean();
        const priceMessagesINCOG = await PriceMessage.find({ type: "BPX" }).lean();
        const priceMessagesMDOG = await PriceMessage.find({ type: "MDOG" }).lean();
        const priceMessagesJ9 = await PriceMessage.find({ type: "J9" }).lean();

        priceMessages.sort((function(a, b) {
            return a.price - b.price;
        }));

        priceMessagesINCOG.sort((function(a, b) {
            return a.price - b.price;
        }));

        priceMessagesMDOG.sort((function(a, b) {
            return a.price - b.price;
        }));

        priceMessagesJ9.sort((function(a, b) {
            return a.price - b.price;
        }));

        discountMessages.sort((function(a, b) {
            return a.createdAt - b.createdAt;
        }));

        for (let i = 0; i < discountMessages.length; i++) {
            console.log("Before", priceMessages[i]);
            priceMessages[i].discount = discountMessages[i].discount;
            console.log("After", priceMessages[i]);
        }

        for (let i = 0; i < priceMessagesINCOG.length; i++) {
            console.log("Before", priceMessages[i]);
            priceMessages[i].incog = priceMessagesINCOG[i].price;
            console.log("After", priceMessages[i]);
        }

        for (let i = 0; i < priceMessagesMDOG.length; i++) {
            console.log("Before", priceMessages[i]);
            priceMessages[i].mdog = priceMessagesMDOG[i].price;
            console.log("After", priceMessages[i]);
        }

        for (let i = 0; i < priceMessagesJ9.length; i++) {
            console.log("Before", priceMessages[i]);
            priceMessages[i].j9 = priceMessagesJ9[i].price;
            console.log("After", priceMessages[i]);
        }

        console.log("Final output", priceMessages);

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
    const newPriceNXG = req.body.newPriceNXG;
    //const newPriceINCOG = req.body.newPriceINCOG;
    const oldPrice = req.body.oldPrice;

    try {
        const productMessages = await ProductMessage.updateMany({ priceNXG: oldPrice }, { priceNXG: newPriceNXG });
        const priceMessages = await PriceMessage.updateOne({ price: oldPrice, type: "NXG" }, { price: newPriceNXG });

        res.status(201).json(productMessages);
    } catch (error) {
        res.status(491).json({ message: error.message });
    }
}

export const updatePricesBPX = async(req, res) => {
    const newPrice = req.body.newPriceINCOG;
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

    UserMessage.findOne({ _id: ["672e86e431de2d5b5a192ddc"] }).then(user => {
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
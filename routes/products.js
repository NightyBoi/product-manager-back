import express from 'express';
import { getProducts, getUnusedProducts, createProduct, deleteProduct, updateProduct, updateProductUse, updatePricesNXG, updatePricesBPX, createPrice, getPricesNXG, getPricesBPX, getPricesALL, deletePrice, loginUser, setProductsUse, setProductsUseByType, getPricesNXGObject } from '../controllers/products.js';
import { authMiddleware } from '../controllers/auth.js';

const router = express.Router();

// All routes we can post/get to of our back-end server
router.get('/', getProducts);
router.post('/', createProduct);
router.get('/unused', getUnusedProducts);
router.get('/remove/:id', deleteProduct);
router.post('/update/:id', updateProduct);
router.post('/update-use/:id', updateProductUse);
router.post('/products-use', setProductsUse);
router.post('/products-use-type', setProductsUseByType);
router.post('/update-prices-nxg', updatePricesNXG);
router.post('/update-prices-bpx', updatePricesBPX);
router.post('/add-price', createPrice);
router.get('/prices-nxg', getPricesNXG);
router.get('/prices-nxg-object', getPricesNXGObject);
router.get('/prices-bpx', getPricesBPX);
router.get('/prices-all', getPricesALL);
router.get('/remove-price/:id', deletePrice);
router.post('/login', loginUser);

router.get('/get', authMiddleware, function(req, res) {
    res.json({ 'access': true });
})

router.get('/list', authMiddleware, function(req, res) {
    res.json({ 'access': true });
})

//router.post('/register', registerUser);
//router.post('/image-upload', productImageUpload);

export default router;
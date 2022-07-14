import express from 'express';
import { getProducts, createProduct, deleteProduct, updateProduct, updatePricesNXG, updatePricesBPX, createPrice, getPricesNXG, getPricesBPX, getPricesALL, deletePrice } from '../controllers/products.js'

const router = express.Router();

// All routes we can post/get to of our back-end server
router.get('/', getProducts);
router.post('/', createProduct);
router.get('/remove/:id', deleteProduct);
router.post('/update/:id', updateProduct);
router.post('/update-prices-nxg', updatePricesNXG);
router.post('/update-prices-bpx', updatePricesBPX);
router.post('/add-price', createPrice);
router.get('/prices-nxg', getPricesNXG);
router.get('/prices-bpx', getPricesBPX);
router.get('/prices-all', getPricesALL);
router.get('/remove-price/:id', deletePrice);
//router.post('/image-upload', productImageUpload);

export default router;
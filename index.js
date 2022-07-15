import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import * as path from 'path';

import productRoutes from './routes/products.js'

const __dirname = path.resolve();
const app = express();

//app.use(cors());
app.use(cors({
    origin: 'https://shark-app-pmtlw.ondigitalocean.app'
}));

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.split("/")[1] === "png") {
        cb(null, true);
    } else {
        cb(new Error("Not a PNG File!!"), false);
    }
};

//const upload = multer({ dest: 'images/' });

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});


app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use('/products', productRoutes);

app.post('/products/image-upload', upload.single('image'), (req, res) => {

    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });

    } else {
        console.log('file received');

        const host = req.hostname;
        const fileName = req.file.filename;

        //console.log(host);
        //console.log(req.file);

        return res.send({
            success: true,
            newFileName: fileName
        })
    }

});

app.use('/', (req, res) => {
    res.send('Hello to Ultimate Product Manager');
})

const PORT = process.env.PORT || 8000;
const CONNECTION_URL = "mongodb+srv://nightyserv:QbdWnL4J1F7vTXCP@cluster0.benpc.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

// mongoose.set('useFindAndModify', false);
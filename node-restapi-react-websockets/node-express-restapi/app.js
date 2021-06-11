const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ){
        cb(null, true);
    } else{
        cb(null, false);
    }
};

// app.use(express.urlencoded({extended: true})); // x-www-form-urlencoded <form>
app.use(express.json()); // application/json
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter}).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

// Error Handling
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

mongoose
    .connect(
        // 'mongodb+srv://shopcart:shopcart@cluster0.cjxn8.mongodb.net/shop?retryWrites=true&w=majority',
        'mongodb://localhost:27017/feed',
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        // console.log(result);
        console.log('MongoDB Connected!!');
        console.log('Server listening at PORT 5000');
        const server = app.listen(5000);
        const io = require('./socket').init(server);
        io.on('connection', socket => {
            console.log('Client Connected');
        });
    })
    .catch(err => console.log(err));

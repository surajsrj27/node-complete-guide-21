const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient
    .connect('mongodb+srv://shopcart:shopcart@cluster0.cjxn8.mongodb.net/shop?retryWrites=true&w=majority', { 
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

// mongodb+srv://shopcart:shopcart@cluster0.cjxn8.mongodb.net/shop?retryWrites=true&w=majority
// mongodb://localhost:27017/shop
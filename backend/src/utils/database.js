const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://node-backend:node-backend@despiensa.wtoei.mongodb.net/despiensa?retryWrites=true&w=majority'
    )
        .then( client => {
            console.log('Conectado');
            _db = client.db(); //Proporciona acceso a la base de datos identificada en la uri, en este caso Despiensa.
            callback();
        })
        .catch( err => {
            console.log(err);
            throw err;
        });
};

const getDB = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
}

exports.mongoConnect = mongoConnect;
exports.getDB = getDB;
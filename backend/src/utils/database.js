const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://node-backend:node-backend@despiensa.wtoei.mongodb.net/despiensa?retryWrites=true&w=majority'
    )
        .then( client => {
            console.log('Conectado');
            callback(client);
        })
        .catch( err => {
            console.log(err);
        });
};

module.exports = mongoConnect;
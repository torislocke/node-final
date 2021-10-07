const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// underscore notes only used internally
let _db;

// connect to mongo db named ecommerce

const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://tlocke:MongoDB12@cluster0.sd8ux.mongodb.net/ecommerce?retryWrites=true&w=majority'
    )
    .then(client => {
      console.log('Connected!');
      _db = client.db()
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
// return access to connected database
const getDb = () => {
    if (_db) {
        return _db;
    } throw 'No database found';
}; 

exports.mongoConnect = mongoConnect; 
exports.getDb = getDb;

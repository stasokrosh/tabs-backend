import mongoose from 'mongoose'

//MongoDB connection
let dev_db_url = 'mongodb://localhost:27017/tabs'
//'mongodb://stasokrosh:1812tqqs@mongodb-2798-0.cloudclusters.net:10011/tabs?authSource=admin';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
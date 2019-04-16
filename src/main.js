// Load environment variable from .env file
require('dotenv').config();

const path = require('path');
const mongoAdapter = require('./dbAdapter/mongoAdapter');
const app = require('./app');

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'test';
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'secret';

const dbAdapter = mongoAdapter(dbUrl, dbName);

dbAdapter.connect().then(async _ =>{
    app(port, secret, dbAdapter, path.join(__dirname,'../public'));
});
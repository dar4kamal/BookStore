const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('express-jwt');

const products = require('./products');
const users = require('./users');
const auth = require('./auth');
const reviews = require('./reviews');
const cart = require('./cart');


const responseFormater = require("./util/response.Formater");

module.exports =  function app(port, secret, dbAdapter, publicDir) {
    const server = express();

    // Host the public folder if configured
    if(publicDir){
        // Host the public folder
        server.use('/', express.static(publicDir));
    }
    
    // Enable security, CORS, compression, favicon and body parsing
    server.use(helmet());
    server.use(cors());
    server.use(compress());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    // Exctract User informations from Authorization header
    server.use(jwt({
        secret,
        credentialsRequired: false
      }));

    server.use((req,res,next)=>{
        res.locals.secret = secret;
        res.locals.dbAdapter = dbAdapter;
        next();
    })
    
    // Expose Routes for app components
    const root = express.Router();
    root.use(products);
    root.use(users);
    root.use(auth);
    root.use(reviews);    
    root.use(cart);    

    server.use('/api', root);

    // MiddleWares
    server.use(responseFormater);
    
    server.listen(port, () => {
        console.log(`Server is Ready at Port ${port} ...`)
    });
}

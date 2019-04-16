const { ObjectID, MongoClient } = require('mongodb');

const isString = x => typeof x === 'string' || x instanceof String;

module.exports = function mongoAdapter(dbUrl, dbName){
    
    let dbClient, db;
    
    const connect = async function connectFn(){
        dbClient = await MongoClient.connect(dbUrl,{ useNewUrlParser: true });
        db = dbClient.db(dbName);
    }

    const close = async function closeFn(){
        return dbClient.close();
    }

    const insert = async function insertDocument(collection, data){
        try {
            const result = await db.collection(collection)
                .insertOne(data);

            return result.ops[0];
        } catch(err) {
            console.log(err);
        }
    }

    const update = async function updateDocument(collection, id, data){
        try {
            const result = await db.collection(collection)
                .findOneAndUpdate({_id: new ObjectID(id)}, {$set: data}, {returnOriginal: false});
            
            return result.value;
        } catch(err) {
            console.log(err);
        }
    }

    const replace = async function replaceDocument(collection, id, data){
        try {
            const result = await db.collection(collection)
                .findOneAndReplace({_id: new ObjectID(id)}, data, {returnOriginal: false});
            
            return result.value;
        } catch(err) {
            console.log(err);
        }
    }

    const remove = async function removeDocument(collection, id){
        try {
            const result = await db.collection(collection)
                .findOneAndDelete({_id: new ObjectID(id)}, {returnOriginal: false});
            
            return result.value;
        } catch(err) {
            console.log(err);
        }
    }

    const get = async function getDocument(collection, query){
        try {
            if(isString(query))
                query = {_id: new ObjectID(query)};
                
            const result = await db.collection(collection)
                .findOne(query);
            
            return result;
        } catch(err) {
            console.log(err);
        }
    }

    const getAll = async function getAllDocument(collection, limit = 0, start = 0,){
        try {
            const result = await db.collection(collection)
            .find({}, {limit, skip: start});
            
            
            return result.toArray();
        } catch(err) {
            console.log(err);
        }
    }

    return {
        connect,
        close,
        insert,
        replace,
        update,
        remove,
        get,
        getAll
    }
}
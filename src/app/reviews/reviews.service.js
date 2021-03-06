const document = "reviews";

const getAll = async (dbAdapter, query) => {
    try {        
        const result = await dbAdapter.getAll(document, query);        
        
        if (result.length > 0) {
            return {
                data: result
            };
        } else {
            return;
        }
    } catch(err) {
        throw err;
    }
};

// const example = {
//     "userId": "5cc7236dc711c3109c7283a5",
//     "username": "mostafafafafafa",
//     "_id": "5cc335ea0b7d6b14c49cbd57",
//     "title": "Harry Potter and the Sorcerer's Stone (Harry Potter, #1)",
//     "image": "https://images.gr-assets.com/books/1447303603m/276742.jpg",
// };

const create = async (dbAdapter, data, query) => {
    try {
        query = Object.assign({...query, ...data})
        const result = await dbAdapter.get(document, query);
        if(result) {
            return;
        } else {
            const reviewResult = await dbAdapter.insert(document, data);
            return reviewResult;
        }        
    } catch(err) {
        throw err;
    }
}

const update = async (dbAdapter, id, data, query) => {
    try {
        const result = await dbAdapter.update(document, id, data);
        return result;
    } catch(err) {
        throw err;
    }
}

const remove = async (dbAdapter, id, query) => {
    try {
        const result = await dbAdapter.remove(document, id);
        return result;
    } catch(err) {
        throw err;
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
};
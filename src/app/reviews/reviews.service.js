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


module.exports = {
    getAll,
    create,
    update
};
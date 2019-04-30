const document = 'products';

const create = async function createFn(dbAdapter, data, query){
    try {
        const result = await dbAdapter.get(document, { 
            "title": data.title,
            "isbn": data.isbn
        });
        if(result) return;

        const productResult = await dbAdapter.insert(document, data);
        return productResult;
    } catch(err) {
        throw err;
    }
}

const replace = async function replaceFn(dbAdapter, id, data, query){
    try {
        const result = await dbAdapter.replace(document, id, data);
        return result;
    } catch(err) {
        throw err;
    }
}
const update = async function updateFn(dbAdapter, id, data, query){
    try {
        const result = await dbAdapter.update(document, id, data);
        return result;
    } catch(err) {
        throw err;
    }
}

const remove = async function removeFn(dbAdapter, id, query){
    try {
        const result = await dbAdapter.remove(document, id);
        return result;
    } catch(err) {
        throw err;
    }
}

const get = async function getFn(dbAdapter, id, query){
    try {
        const result = await dbAdapter.get(document, id);
        return result;
    } catch(err) {
        throw err;
    }
}

const getAll = async function getAllFn(dbAdapter, query = {}){
    try {
        const result = await dbAdapter.getAll(document)
        return {
            data: result
        };
    } catch(err) {
        throw err;
    }
}

module.exports= {
    create,
    update,
    replace,
    remove,
    get,
    getAll
};

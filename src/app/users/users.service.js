const document = 'users';

const create = async function createFn(dbAdapter, data, query){
    try {
        const user = await dbAdapter.get(document, { username: data.username });
        if(user) return;

        const result = await dbAdapter.insert(document, data);
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

const update = async function updateFn(dbAdapter, id, data, query){
    try {
        const result = await dbAdapter.update(document, id, data);
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

module.exports= {
    update,
    create,
    getAll,
    get
};

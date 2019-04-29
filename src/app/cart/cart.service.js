const document = "users";

const update = async (dbAdapter, id, data, query) => {
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

module.exports = {
    get,
    update
};
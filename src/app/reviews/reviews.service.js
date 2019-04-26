const document = "reviews";

const getAll = async (dbAdapter, query = {}) => {
    try {
        const result = await dbAdapter.getAll(document, parseInt(query.limit), parseInt(query.start) );
        console.log(result);
        if (result.length > 0) {
            return {
                data: result,
                limit: query.limit,
                start: query.start
            };
        } else {
            return;
        }
    } catch(err) {
        throw err;
    }
};

module.exports = {
    getAll
};
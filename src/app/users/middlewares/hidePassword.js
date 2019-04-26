module.exports = function hidePassword(req, res, next){
    const users = res.locals.data;
    if(users && !req.url.includes("products")){
        if(Array.isArray(users.data)){
            res.locals.data.data = users.data.map(user => ({...user, password:'hidden'}));
        }
        else{
            // res.locals.data = {...users, password:'hidden'};
            res.locals.data = { 
                _id : users._id,
                username : users.username,
                email : users.email
            };
        }
    }
    next();
}
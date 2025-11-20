const AdminAuthMiddleware = (req, res, next)=>{
    console.log("This is Admin route !");

    const token = 'abc'

    const isAuthorized = token === 'abc';

    if (!isAuthorized) {
        return res.status(401).send('Unauthorized Access');
    }else{
        next()
    }
}



const UserAuthMiddleware = (req, res, next)=>{
    console.log("This is User Route Middleware !");

    const token = 'userToken123'

    const isAuthorized = token === 'userToken';

    if (!isAuthorized) {
        return res.status(401).send('Unauthorized Access');
    }else{
        next()
    }
}


module.exports = {
    AdminAuthMiddleware,
    UserAuthMiddleware
}
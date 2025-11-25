const UserMiddleware = (req, res, next) => {
    console.log('User Middleware Executed');

    const token = 123;

    const isAuthorized = token === 1232332;

    if (!isAuthorized) {
        res.status(401).send('Unauthorized Access from Middleware');
    } else {
        next()
    }
}


const AdminMiddleware = (req, res, next) => {

    console.log("Authorized by Admin !");


    const token = 123;

    const isAuthorized = token === 123;

    if (!isAuthorized) {
        res.status(401).send('Unauthorized Access from Admin Route');
    } else {
        next()
    }
}



module.exports = {
    UserMiddleware,
    AdminMiddleware
}



const { getUser } = require("../service/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.headers["authorization"];
    if (!userUid) return res.redirect("/login"); // no uid
    const token = userUid.split("Bearer ")[1]; 
    const user = getUser(token); //decoded payload or null, payload has mail and _id
    if (!user) return res.redirect("/login"); // no user of this uid
    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    console.log(req.headers);
    const userUid =req.headers["authorization"];
    const token = userUid.split("Bearer ")[1]; 
    const user = getUser(token);     
    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
}

// async function restrictToLoggedinUserOnly(req, res, next) {
//     const userUid = req.cookies?.uid;
//     if (!userUid) return res.redirect("/login"); // no uid
//     const user = getUser(userUid); //decoded payload or null, payload has mail and _id
//     if (!user) return res.redirect("/login"); // no user of this uid
//     req.user = user;
//     next();
// }


const jwt = require('jsonwebtoken');
const secret = "oshika@123@";


//MAKES TOKENS
function setUser(user) { //  user = model schem -> {name, email, pw, ts}
    return jwt.sign({
        _id: user._id, //_id , mongo db adds itself
        email: user.email,
    }, 
    secret
);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret); // returns decoded payload
    }
    catch {
        return null;
    }    
}

module.exports = {
    setUser,
    getUser,
}

// const sessionIdtoUserMap = new Map();
//its a  state, Gets erased when you restart the server.

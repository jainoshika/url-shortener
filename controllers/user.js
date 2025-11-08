const User = require("../models/user");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    console.log(req.body);
    await User.create({ // creating schema type data in db
        name, 
        email,
        password,
    });
    return res.render("login"); // http://localhost:8001/user
}
//application use only after login, data from frontend - email, password
async function handleUserLogin(req, res) {
    const { email, password } = req.body; //input
    const user = await User.findOne({ email, password });
    if (!user) {
        return res.render("login", {
            error: "Invalid email or password"
        })
    }
    const token  = setUser(user); // user = model schem -> {name, email, pw, ts}
    return res.json({ token });// The redirect happens in the frontend, not the backend. this is for api backend and frontend
    // this is for web apps -> res.cookie("uid", token);
    // return res.redirect("/"); //root page which is main application
}
module.exports = {
    handleUserSignup,
    handleUserLogin,
}
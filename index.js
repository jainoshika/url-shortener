const express = require("express");
const PORT = 8001;
const app = express();
const { connectMongoDB } = require("./config/connections");
const path = require("path");
const staticRoute = require("./routes/staticRoute");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const URLRoute = require("./routes/url");

//Connections
connectMongoDB("mongodb://127.0.0.1:27017/shorten-url");

//Model schema

//EJS - Server side rendering
app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
    
//Routes -> Controllers
//TODO: shows shortids - redirect - counts
app.use("/url", URLRoute);  // first visit, if /url in path
app.use("/", staticRoute);

app.listen(PORT, ()=>{console.log(`Server started at PORT ${PORT}`)});
//Requiring express.
const express = require("express");
//Requiring mongoose
const mongoose = require("mongoose");

const app = express();



app.listen(3001,()=>{
    console.log("Connected to localhost:${PORT}")
});
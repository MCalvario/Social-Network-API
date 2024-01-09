const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/networkDB');

app.listen(3001,()=>{
    console.log("Backend server is running")
})
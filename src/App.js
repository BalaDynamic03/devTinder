const express = require('express');

require('./config/server');

const app = express();

const User = require("./model/user")

app.post("/signup", async (req, res)=>{
    const user = new User({
      firstName : "bala",
      lastName : "bala",
      emailId:"bala@gmail.com",
      password: "bala@123"
    });

    await user.save()
    res.send("user Added succesfully")
})


app.listen(7777, () => {
    console.log("sending correctly");
});
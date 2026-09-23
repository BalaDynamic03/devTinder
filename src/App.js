const express = require('express');

require('./config/server');

const app = express();

const User = require("./model/user")

app.use(express.json())

app.post("/signup", async (req, res)=>{

    const user = new User(req.body);
    try{
        await user.save();
        res.send("user added successfully...")
    }catch(err){
      res.status(400).send("errro saveing" + err.message)
    }
    
})

app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try {
        const user = await User.findOne({ emailId: userEmail });
        if(user.length === 0){
            res.status(400).send("User not found")
        }else{
           res.send(user);
        }
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});


// feed APi
app.get("/feed", async (req, res) => {
    const userEmail = req.query.emailId;

    try {
        const user = await User.find({ emailId: userEmail });
        if(user.length === 0){
            res.status(400).send("User not found")
        }else{
           res.send(user);
        }
        
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

app.listen(7777, () => {
    console.log("sending correctly");
});
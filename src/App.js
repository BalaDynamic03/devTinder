const express = require("express");
const bcrypt = require("bcrypt")
require("./config/server");

const app = express();

const User = require("./model/user");
const {validateSignUpData} = require("./utills/validation")

app.use(express.json());


app.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        });

        await user.save();

        res.send("user Added Successfully...");
    } catch (err) {
        console.log(err);
        res.status(400).send("Error saving: " + err.message);
    }
});


app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        const user = await User.findOne({ emailId });
        if (!user) {
            return res.status(400).send("EmailId is not present in DB");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        console.log("bcrypt result:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(400).send("Password is not correct");
        }

        res.send("Login Successfully");

    } catch (err) {
        console.log(err);
        res.status(500).send("Error: " + err.message);
    }
});



app.get("/feed", async (req, res) => {
    const userEmail = req.query.emailId;

    try {
        const user = await User.find({ emailId: userEmail });

        res.send(user);
    } catch (err) {
        res.status(400).send("Error finding user: " + err.message);
    }
});


app.delete("/user", async (req, res)=>{
   
     const userId = req.body.userId;

    
    try {
        const user = await User.findByIdAndDelete(userId);

        res.send("user deleted Succesfully!..");
    } catch (err) {
        res.status(400).send("Error finding user: " + err.message);
    }
})


app.patch("/user", async (req, res)=>{

const userId = req.body.userId;
const data = req.body

try{
    const user = await User.findByIdAndUpdate({_id : userId}, data, {
        returnDocument : "before"
    })
    console.log(user)
    res.send("user updated succefully")
}catch(err){
   res.status(400).send("somethink went wreong")
}


})

app.listen(7777, () => {
    console.log("sending correctly");
});
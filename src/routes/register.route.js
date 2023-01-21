const express = require("express");
const registerRoute = express.Router();
const registerModel = require("../model/register.model");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken")

registerRoute.get("/", async (req, res) => {
    const register = await registerModel.find();
    return res.status(200).send({ message: "Registered Users", desc: "", data: register })
})
registerRoute.post("/getprofile", async (req, res) => {
    const { token } = req.body;
    console.log('token:', token)
    try {
        if (!token) {
            return res.status(401).send({
                data: [],
                message: "Unauthorized Person",
                flag: false,
                desc: "",
            });
        } else if (token) {
            const verification = jwt.decode(token, "SECRET_register");
            console.log('verification:', verification)
            return res.status(200).send({ message: "Registered Users", desc: "", register: verification })
        }
    } catch (error) {
        console.log("error:", error);
        return res.status(403).send({
            data: [],
            message: "Error Occur",
            flag: false,
            desc: error.message,
        });
    }
})

registerRoute.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    const registerCheck = await registerModel.find({ email });
    console.log('registerCheck:', registerCheck)
    const hash = await argon2.hash(password);
    console.log('hash:', hash);
    try {
        if (registerCheck.length !== 0) {
            return res.status(201).send({ message: "User with this email id already have an account", desc: "", register: registerCheck })
        }
        let register = new registerModel({ name, email, password: hash });
        await register.save();
        return res.status(200).send({ message: "Register SuccessFully", desc: "", register })
    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message });
    }
});

registerRoute.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const registerFind = await registerModel.findOne({ email });
    console.log('registerFind:', registerFind);
    try {

        if (registerFind && await argon2.verify(registerFind.password, password)) {
            let token = jwt.sign(
                { id: registerFind._id, name: registerFind.name, email: registerFind.email },
                "SECRET_register",
                { expiresIn: "4 days" }
            )
            return res.status(200).send({ message: "Login SuccessFully", desc: "", register: registerFind, token })
        } else {
            return res.status(404).send({ message: "Wrong Credential", desc: "", register: [] })
        }

    } catch (e) {
        return res.status(401).send({ message: "Error...", desc: e.message });
    }
})

module.exports = registerRoute;
const { Schema, model } = require("mongoose");

const registerSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true }
})

const registerModel = model("register", registerSchema);

module.exports = registerModel;
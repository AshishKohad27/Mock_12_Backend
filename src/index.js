require("dotenv").config();
const express = require("express");
const connect = require("./config/db");

const registerRoute = require("./routes/register.route");

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/register", registerRoute);

app.get("/", async (req, res) => {
    res.send("New Backend for Mock_12 routes are 1./register/register   2. /register/login")
});

app.listen(PORT, async () => {
    await connect();
    console.log(`Listening on http://localhost:${PORT}`);
})
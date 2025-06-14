const express = require("express");
require("dotenv").config();
const connectToDb = require("./config/connectToDB");

connectToDb();


const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"))
app.use("/api/users", require("./routes/usersRoute"))

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));
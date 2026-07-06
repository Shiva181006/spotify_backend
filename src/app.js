const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes")
const musicRoutes = require("./routes/music.routes")


const app = express();
app.use(express.json()); // request.body me data aa sake
app.use(cookieParser()); // cookies me data set kr sake aur sath hi sath cookies me jo data aaye ga use padh sake

app.use("/api/auth",authRoutes);
app.use("/api/music",musicRoutes)

module.exports = app;
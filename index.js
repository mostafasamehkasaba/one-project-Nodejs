const express = require("express");
const app = express();

require("dotenv").config();

const cors = require("cors");
const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

const httpSucess = require("./utiles/httpSuccess");

mongoose.connect(url).then(() => {
    console.log("mongodb connected");
});

app.use(express.json());
app.use(cors());

// app.use('/uploads')

// routes
const courseRouter = require("./routes/courses.route");
const usersRouter = require("./routes/users.route");

app.use("/api/courses", courseRouter);
app.use("/api/users", usersRouter)

// 404 middleware
app.use((req, res) => {
    return res.status(404).json({
        status: httpSucess.ERROR,
        message: "this resource is not available"
    });
});

// error middleware
app.use((err, req, res, next) => {

    res.status(err.statusCode || 500).json({
        status: err.statusText || httpSucess.ERROR,
        message: err.message || "Internal Server Error"
    });

});

app.listen(process.env.PORT || 4000, () => {
    console.log("listening on port 4000");
});
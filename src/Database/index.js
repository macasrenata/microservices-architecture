const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost:27017/test-node-2023")
    .then(() => {
        console.log("mongo on");
    }).catch(erro => {
        console.log(erro);
    });

db = mongoose.connection;

module.exports = db;
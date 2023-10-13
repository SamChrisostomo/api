const mongoose = require("mongoose");

const Person = mongoose.model("Person", {
    name: String,
    email: String,
    phone: Number
});

module.exports = Person;
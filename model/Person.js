const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    biography: { type: String, default: '' },
    avatar: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    level: { type: String, default: "user" }
});

module.exports = mongoose.model("Person", personSchema);
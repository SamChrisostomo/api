const fs = require("fs");
const path = require("path");
const { createHmac } = require("node:crypto");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.getHash = () => {
    let hash;

    const hmac = createHmac('sha256', process.env.JWT_PASS);
    hmac.on('readable', () => {
        const data = hmac.read();
        if (data) {
            hash = data.toString('hex');
            const HashFile = path.join(__dirname, "hash.txt");
            fs.writeFileSync(HashFile, hash);
        };
    });

    hmac.end();

    return hash;
}

exports.getProfile = (person) => {
    let newPerson = {
        name: person.name,
        bio: person.biography,
        avatar: person.avatar,
        email: person.email,
        phone: person.phone,
    }

    return newPerson;
}

exports.authPerson = async (token) => {
    const decoded = jwt.verify(token, this.getHash());
    return decoded;
}
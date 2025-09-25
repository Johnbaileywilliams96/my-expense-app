const db = require('../../../lib/database')
const bcrypt = require('bcrypt')



export default function handler(req, res) {
    if (req.method === 'POST') {
        const {email, password} = req.body;

        const hashedPassword = bcrypt.hashSync(password,10);

        const result = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)')
            .run(email, hashedPassword);

        res.status(201).json({message: 'User created'})
    }
}
const db = require('../../../lib/database');
const bcrypt = require('bcrypt');

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        const user = db.prepare(`SELECT * FROM users WHERE email = ?`).get(email);

        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({user: {id: user.id, email: user.email}})
        } else {
            res.status(401).json({error: 'invalid credentials'})
        }
    }
}
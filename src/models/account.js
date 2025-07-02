const mysql = require('mysql2/promise');
const connection = require('../config/connection');

class Account {
    static async create(accountData) {
        const [result] = await connection.execute('INSERT INTO accounts (name, email, address, created_at, status) VALUES (?, ?, ?, ?, ?)', [accountData.name, accountData.email, accountData.address, accountData.created_at, accountData.status]);
        return { id: result.insertId, ...accountData };
    }

    static async findById(id) {
        const [rows] = await connection.execute('SELECT * FROM accounts WHERE id = ?', [id]);
        return rows[0];
    }
}

module.exports = Account;
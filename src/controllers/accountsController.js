const Account = require('../models/account');

exports.createAccount = async (req, res) => {
    try {
        const accountData = req.body;
        const account = await Account.create(accountData);
        res.status(201).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAccountDetails = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findById(id);
        if (!account) {
            return res.status(404).json({ error: 'Account not found' });
        }
        res.status(200).json(account);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
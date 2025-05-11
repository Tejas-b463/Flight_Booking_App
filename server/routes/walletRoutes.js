const express = require('express');
const router = express.Router();
const { getWallet } = require('../controllers/walletController');

router.get('/:userId', getWallet); // GET /api/wallet/:userId

module.exports = router;
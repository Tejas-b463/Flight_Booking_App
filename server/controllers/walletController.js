const User = require('../models/User');

exports.getWallet = async(req, res) => {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
        userId: user._id,
        wallet: user.wallet
    });
};
const User = require('../models/User')
const changePassword = async (req, res) => {
    console.log(1)
    try {
        const { oldPassword, newPassword } = req.body;
        const handle = req.user.handle
        const user = await User.findOne({ handle });

        if (user) {
            const passCheck = await user.comparePassword(oldPassword);

            if (passCheck) {
                user.password = newPassword;
                await user.save();

                res.status(200).json({ msg: 'Password changed successfully', success: true });
            } else {
                res.status(401).json({ msg: 'Invalid old password' });
            }
        } else {
            res.status(404).json({ msg: 'Account not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};
module.exports = changePassword

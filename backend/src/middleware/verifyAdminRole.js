const { request, response } = require("express");

const verifyAdminRole = async (req = request, res = response, next) => {
    if (!req.activeUserRole) {
        return res.status(403).json({
            msg: 'No role'
        });
    }

    if (req.activeUserRole !== 'refugio') {
        return res.status(403).json({
            msg: 'No admin role'
        });
    }

    next();
}

module.exports = {
    verifyAdminRole
}
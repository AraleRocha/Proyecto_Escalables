const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyAdminRole= async (req= request, res = response, next) => {
    if(!req.activeUserRole){
        return res.status(403).json({
            msg: 'No role'
        });
    }
    if(req.activeUserRole !== 'admin'){
        return res.status(403).json({
            msg: 'No admin role'
        });
    }
    next();

}

module.exports = {
    verifyAdminRole
}
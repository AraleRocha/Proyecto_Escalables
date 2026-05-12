const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const verifyJWT = async (req= request, res = response, next) => {
    const token = req.header('Authorization');
    
    console.log('Verificando JWT...');
    if(!token){
        return res.status(401).json({
            msg: 'No token'
        });
    }
    try {
        const {id} = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findOne({ _id: id });
        if(!user){
            return res.status(401).json({
                msg: 'Invalid token'
            });
        }
        req.activeUserRole = user.role;
        req.activeUser = user;
        next();
    } catch (error) {
        return res.status(401).json({
            msg: 'Invalid token'
        });

    }
    
}

module.exports = {
    verifyJWT
}
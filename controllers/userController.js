UserModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.index = function (req, res) {
    UserModel.get(function (err, users) {
        if (err) {
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            if (users === undefined || users.length == 0) {
                res.json({
                    status: 200,
                    statusText: "success",
                    message: "No data"
                });
            }else{
                res.json({
                    status: 200,
                    statusText: "success",
                    data: users
                });
            }
        }
    });
};

exports.new = function (req, res) {
    const { username, email, password } = req.body;
    
    if (!username || !email || !password) {
        res.json({
            statusText: "error",
            message: 'Please enter all fields',
        });
    }else{
        if (password.length < 6) {
            res.json({
                statusText: "error",
                message: 'Password must be at least 6 characters',
            });
        } else {
            UserModel.findOne({ email: email }).then(user => {
                if (user) {
                    res.json({
                        statusText: "error",
                        message: 'Email already exists',
                    });
                } else{
                    UserModel.findOne({username: username}).then(user => {
                        if(user){
                            res.json({
                                statusText: "error",
                                message: 'Username already exists',
                            });
                        }else {
                            const newUser = new UserModel({
                                username,
                                email,
                                password
                            });
                
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(newUser.password, salt, (err, hash) => {
                                    if (err) throw err;
                                    newUser.password = hash;
                                    newUser
                                        .save()
                                        .then(user => {
                                            var data = {
                                                "_id": user._id,
                                                "username": user.username,
                                                "email": user.email
                                            }
                                            var token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });

                                            res.json({
                                                status: 200,
                                                statusText: "success",
                                                message: 'User created',
                                                token,
                                                data
                                            });
                                        })
                                        .catch(err => {
                                            res.status(401).json({
                                                status: 401,
                                                statusText: 'error',
                                                err
                                            })
                                        });
                                });
                            });
                        }
                    })
                }
                
            });
        }
    }
};

exports.login = function(req, res){
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(401).json({
            statusText: "error",
            message: 'Please enter all fields',
        });
    }else{
        UserModel.findOne({email: email}).then(user => {
            if(user){
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    const data = {
                        "_id": user._id,
                        "username": user.username,
                        "email": user.email
                    }
                    if (err) throw err;
                    if (isMatch) {
                        var token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP });
                        res.json({
                            status: 200,
                            statusText: "success",
                            message: 'logged in',
                            token
                        });
                    }else{
                        res.status(401).json({
                            statusText: "error",
                            message: 'password is wrong',
                        });
                    }
                })
            }else{
                res.status(401).json({
                    statusText: "error",
                    message: 'Email is not registered',
                });
            }
        })
    }
};
Du3aaModel = require('../models/du3aaModel');

exports.index = function (req, res) {
    Du3aaModel.get(function (err, du3aas) {
        if (err) {
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            if (du3aas === undefined || du3aas.length == 0) {
                res.json({
                    status: 200,
                    statusText: "success",
                    message: "No data"
                });
            }else{
                res.json({
                    status: 200,
                    statusText: "success",
                    count: du3aas.length,
                    data: du3aas
                });
            }
        }
    });
};

exports.random = function (req, res){
    Du3aaModel.get(function(err, du3aas){
        if (err) {
            res.json({
                statusText: "error",
                message: err
            });
        }else{
            if (du3aas === undefined || du3aas.length ==0) {
                res.json({
                    status: 200,
                    statusText: "success",
                    message: "No data"
                });
            }else{
                var random = Math.floor(Math.random() * du3aas.length)
                var du3aa = du3aas[random].du3aa;
                res.json({
                    du3aa
                });
            }
        }
    });
};

exports.new = function (req, res) {
    var du3aa = new Du3aaModel();

    du3aa.du3aa = req.body.du3aa;
    
    du3aa.save(function (err) {
        if (err){
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            res.json({
                status: 200,
                statusText: "success",
                message: 'New du3aa created',
                data: du3aa
            });
        }
    });
};

exports.view = function (req, res) {
    Du3aaModel.findById(req.params.du3aa_id, function (err, du3aa) {
        if (err){
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            if (du3aa == null) {
                res.json({
                    status: 200,
                    statusText: "success",
                    message: 'No data'
                });
            }else{
                res.json({
                    status: 200,
                    statusText: "success",
                    data: du3aa
                });
            }
        }
    });
};

exports.update = function (req, res) {
    Du3aaModel.findById(req.params.du3aa_id, function (err, du3aa) {
        if (err){
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            du3aa.du3aa = req.body.du3aa;
            
            du3aa.save(function (err) {
                if (err){
                    res.json({
                        statusText: "error",
                        message: err,
                    });
                }else{
                    res.json({
                        status: 200,
                        statusText: "success",
                        message: 'du3aa updated',
                        data: du3aa
                    });
                }
            });
        }
    });
};

exports.delete = function (req, res) {
    Du3aaModel.deleteOne({
        _id: req.params.du3aa_id
    }, function (err, du3aa) {
        if (err){
            res.json({
                statusText: "error",
                message: err,
            });
        }else{
            res.json({
                status: 200,
                statusText: "success",
                message: 'Du3aa deleted'
            });
        }
    });
};
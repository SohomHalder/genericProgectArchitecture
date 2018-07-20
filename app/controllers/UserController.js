const UserModel = require('../models/UserModel.js');

// Create and Save a new UserModel
exports.create = (req, res) => {
    // Validate request
    if(!req.body.add) {
        return res.status(400).send({
            message: "UserModel add can not be empty"
        });
    }

    // Create a UserModel
    const user = new UserModel({
        name: req.body.name || "default", 
        add: req.body.Address || "default"
    });

    // Save UserModel in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the UserModel."
        });
    });
};

// Retrieve and return all users from the database.
exports.findAll = (req, res) => {
    UserModel.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};

// Find a single user with a userId
exports.findOne = (req, res) => {
    UserModel.findById(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.add) {
        return res.status(400).send({
            message: "UserModel add can not be empty"
        });
    }

    // Find user and update it with the request body
    UserModel.findByIdAndUpdate(req.params.userId, {
        name: req.body.name || "Untitled UserModel",
        add: req.body.add
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.userId
        });
    });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    UserModel.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });
        }
        res.send({message: "UserModel deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "UserModel not found with id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};

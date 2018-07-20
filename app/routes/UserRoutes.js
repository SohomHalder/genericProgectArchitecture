module.exports = (app) => {
    const userController = require('../controllers/UserController.js');

    // Create a new User
    app.post('/user', userController.create);

    // Retrieve all Users
    app.get('/notes', userController.findAll);

    // Retrieve a single User with noteId
    app.get('/user/:userId', userController.findOne);

    // Update a User with noteId
    app.put('/user/:userId', userController.update);

    // Delete a User with noteId
    app.delete('/user/:userId', userController.delete);
}
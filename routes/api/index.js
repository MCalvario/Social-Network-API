//requiring express router
const router = require('express').Router();

//This is setting up the user userRoutes.
const userRoutes = require('./user-routes');
//This is setting up the thoughts routes.
const thoughtRoutes = require('./thought-routes');

// This will add users to the users routes.
router.use('/users', userRoutes);
// This will add thoughts to the thoughts routes.
router.use('/thoughts', thoughtRoutes);

//This is the module exports router.
module.exports = router;
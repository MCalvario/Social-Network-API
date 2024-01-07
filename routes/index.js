// Requiring the express router
const router = require('express').Router();

// Importing all of the API routes 
const apiRoutes = require('./api');

// adding a prefix of `/api` to all of the api routes
router.use('/api', apiRoutes);

// This is the error message.
router.use((req, res) => {
    res.status(404).send('<h1>404 Error!</h1>');
  });

// This is the module exports router.
module.exports = router;
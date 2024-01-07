// Requiring express router.
const router = require('express').Router();

// Requirements.
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// These are the GET all and POST at the /api/users
router
    .route('/')
    .get()
    .post();

// This is the GET one, PUT, and DELETE at the /api/users/:id.
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)

// This is the POST and DELETE a friend at the /api/users/:userId/friends/:friendId
router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

// This is the /api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

module.exports = router;
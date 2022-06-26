const { getAllUsersController, getSingleUserController, patchSingleUserController } = require('../controller/usersController');
const authenticated = require('../middleware/authenticateMiddleware');


const router = require('express').Router()

router.get('/:userId', getSingleUserController);

router.patch('/:userId', patchSingleUserController);

router.delete('/:userId', async (req, res) => {

});

router.get('/', getAllUsersController);
router.post('/', authenticated, async (req, res) => {
    console.log(req.user);
}
);

module.exports = router;
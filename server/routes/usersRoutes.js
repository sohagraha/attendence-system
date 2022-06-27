const { getAllUsersController, getSingleUserController, patchSingleUserController, postSingleUserController, deleteSingleUserController } = require('../controller/usersController');
const authenticated = require('../middleware/authenticateMiddleware');


const router = require('express').Router()

router.get('/:userId', getSingleUserController);

router.patch('/:userId', patchSingleUserController);
router.delete('/:userId', deleteSingleUserController);

router.get('/', getAllUsersController);
router.post('/', postSingleUserController);


module.exports = router;
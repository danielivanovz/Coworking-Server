import { Router } from 'express';

import * as userController from '../../controllers/users.c';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

router.get('/retrieve', userController.getUserIDbyUsername);
router.get('/id', userController.getUserByID);
router.get('/:query', userController.getUserWithQuery);

export default router;

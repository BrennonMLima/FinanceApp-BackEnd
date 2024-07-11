import express from 'express';
import UserController from '../controller/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.registerUser);
router.get('/:userId/group', userController.getUserGroup);

export default router;

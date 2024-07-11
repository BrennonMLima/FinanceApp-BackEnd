import express from 'express';
import UserController from '../controller/user.controller';
import protectedRoute from "../security/guard";

const router = express.Router();
const userController = new UserController();

router.post('/', userController.registerUser);
router.get('/:userId/group', protectedRoute, userController.getUserGroup);

export default router;

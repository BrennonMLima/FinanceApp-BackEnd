import express from 'express';
import GroupController from '../controller/group.controller';
import protectedRoute from '../security/guard';

const router = express.Router();
const groupController = new GroupController();

router.post('/',protectedRoute, groupController.createGroup);
router.get('/',protectedRoute, groupController.getAllGroups);
router.get('/:id',protectedRoute, groupController.getGroupById);

export default router;

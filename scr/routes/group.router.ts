import express from 'express';
import GroupController from '../controller/group.controller';

const router = express.Router();
const groupController = new GroupController();

router.post('/', groupController.createGroup);
router.get('/', groupController.getAllGroups);
router.get('/:id', groupController.getGroupById);

export default router;

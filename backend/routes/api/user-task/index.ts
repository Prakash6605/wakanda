import { Router } from 'express';
import { isAdmin } from '../../../middlewares/authentication';
import controller from './controller';

const router = Router();

router.post('/', controller.handleCreate);
router.get('/', controller.handleGetTasks);

export default router;

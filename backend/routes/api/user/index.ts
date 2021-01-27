import { Request, Response, Router } from 'express';
import { isAuthenticated } from '../../../middlewares/authentication';
import controller from './controller';

const router = Router();

router.get('/me', isAuthenticated, controller.handleGetMe);

router.get('/', controller.handleGetAll);

export default router;

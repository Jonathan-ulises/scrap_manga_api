import { Router } from 'express';
import { getRecentManga } from '../controllers/home.controller';

const router = Router();

router.get('/', getRecentManga)

export default router;
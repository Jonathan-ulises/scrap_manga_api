import { Router } from 'express';
import { getChapterList, getDetailManga, getMangaByGenres, getMangaPages, getRecentManga } from '../controllers/otome.controller';

const router = Router();

router.get('/', getRecentManga)

router.post('/detail', getDetailManga)

router.post('/mangaPages', getMangaPages)

router.post('/search', getMangaByGenres)

router.post('/chapterList', getChapterList)

export default router;
import { Router } from 'express';

const router = Router();

router.get('/',  (req, res) => {
    res.json({
        msg: 'Corriendo ruta principal'
    })
})

export default router;
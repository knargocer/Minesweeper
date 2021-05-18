import express from 'express';

import { getGames, playGame } from '../controllers/game.controller.js';

const router = express.Router();

router.get('/', getGames);
router.post('/', playGame);

export default router;
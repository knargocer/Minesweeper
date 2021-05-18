import express from 'express';
import Game from '../models/game.entity.js';

const router = express.Router();

export const getGames = async (req, res) => { 
    try {
        const games = await Game.find();
                
        res.status(200).json(games);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const playGame = async (req, res) => {
    const {player_username, score, id, difficulty } = req.body;


    try {
        const result = await Game.create( {player_username, score, id, difficulty })
        res.status(200).json(result );

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;
import * as api from '../api';

import { FETCH_ALL, PLAY } from '../commons/actionTypes';

export const getGames = () => async (dispatch) => {
    try {
      const { data } = await api.fetchGames();
  
      dispatch({ type: FETCH_ALL,  data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const makeGame = (game) => async (dispatch) => {
    try {
      const { data } = await api.playGame(game);
      dispatch({ type: PLAY, data });
      
    } catch (error) {
      console.log(error.message);
    }
  };
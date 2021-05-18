
import * as actionType from '../commons/actionTypes';

const gameReducer = (games = [], action) => {
  switch (action.type) {
    case actionType.FETCH_ALL:
      return action.payload
    case actionType.PLAY:
        return [...games, action.payload]
     default:
        return games;
    }
}
export default gameReducer;
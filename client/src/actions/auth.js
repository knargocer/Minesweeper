import {AUTH} from '../commons/actionTypes';
import * as api from '../api/index.js';


export const signIn = (formIn, history) => async (dispatch)=>{
    try {
        const { data } = await api.signIn(formIn);
        dispatch({ type: AUTH, data });
        history.push('/');
      } catch (error) {
        console.log(error);
      }    
} 



export const signUp = (formIn, history) => async (dispatch)=>{
    try {
        const { data } = await api.signUp(formIn);
    
        dispatch({ type: AUTH, data });
    
        history.push('/');
      } catch (error) {
        console.log(error);
      }    
} 


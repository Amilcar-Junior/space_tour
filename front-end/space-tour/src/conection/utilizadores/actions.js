import {

    CREATE_UTILIZADOR,
   
    RETRIEVE_UTILIZADORES,
   
    UPDATE_UTILIZADOR,
   
    DELETE_UTILIZADOR,
   
   } from "./actionTypes";
   
   import UtilizadoresService from "./utilizadoresService";

   
   export const createUtilizador =
   
    (username, email, password, confirmed, blocked, role, name, telefone, endereco, especialidade, foto ) => async (dispatch) => {
   
      try {
   
        const res = await UtilizadoresService.create({
   
        username,
   
         email,
   
         password,

         confirmed,

         blocked,

         role,

         name,

         telefone,
         
         endereco,
        
         especialidade,
         foto,
   
        });
   
        dispatch({
   
          type: CREATE_UTILIZADOR,
   
          payload: res.data,
   
        });
   
       return Promise.resolve(res.data);

      } catch (err) {
        

        return Promise.reject(err);

      }
   
    };
   
   export const retrieveUtilizadores = () => async (dispatch) => {
   
    try {
      const res = await UtilizadoresService.getAll();
   
      dispatch({
   
        type: RETRIEVE_UTILIZADORES,
   
        payload: res.data,
   
      });
   
    } catch (err) {


      console.log(err);

    }
   
   };
   
   export const updateUtilizador = (id, data) => async (dispatch) => {
   
    try {
   
      const res = await UtilizadoresService.update(id, data);
   
      dispatch({
   
        type: UPDATE_UTILIZADOR,
   
        payload: data,
   
      });
   
    return Promise.resolve(res.data);

  } catch (err) {

    return Promise.reject(err);

  }
   
   };
   
   export const deleteUtilizador = (id) => async (dispatch) => {
   
    try {
   
      await UtilizadoresService.delete(id);
   
      dispatch({
   
        type: DELETE_UTILIZADOR,
   
        payload: { id },
   
      });
   

    } catch (err) {
 
      console.log(err);
  
    }
   
   };
import {

    CREATE_UTILIZADOR,
   
    RETRIEVE_UTILIZADORES,
   
    UPDATE_UTILIZADOR,
   
    DELETE_UTILIZADOR,
   
   } from "./actionTypes";
   
   const initialState = {};
   
   function utilizadorReducer(utilizadores = initialState, action) {
   
    const { type, payload } = action;
   
    switch (type) {
   
      case CREATE_UTILIZADOR:
   
        return [...utilizadores, payload];
   
      case RETRIEVE_UTILIZADORES:
   
        return payload;
   
      case UPDATE_UTILIZADOR:
   
        return utilizadores.map((utilizador) => {
   
          if (utilizador.id === payload.id) {
   
            return {
   
              ...utilizador,
   
              ...payload,
   
            };
   
          } else {
   
            return utilizadores;
   
          }
   
        });
   
      case DELETE_UTILIZADOR:
   
        return utilizadores.filter(({ id }) => id !== payload.id);
   
      default:
   
        return utilizadores;
   
    }
   
   }
   
   export default utilizadorReducer;
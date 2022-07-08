import {

    RETRIEVE_PROFILE,
   
    UPDATE_PROFILE,
   
   
   } from "./actionTypes";
   
   const initialState = {};
   
   function profileReducer(users = initialState, action) {
   
    const { type, payload } = action;
   
    switch (type) {
   
      
      case RETRIEVE_PROFILE:
   
        return payload;
   
      case UPDATE_PROFILE:
   
        return payload;
   
   
      default:
   
        return users;
   
    }
   
   }
   
   export default profileReducer;
import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./conection/profile/reducers";
import utilizadorReducer from "./conection/utilizadores/reducers";

export default configureStore({

 reducer: {

   users: profileReducer,
   utilizadores: utilizadorReducer,
   profile: profileReducer,
   
 },

});


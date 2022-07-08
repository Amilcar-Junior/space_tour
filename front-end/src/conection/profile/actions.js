import {


  RETRIEVE_PROFILE,

  UPDATE_PROFILE,


} from "./actionTypes";

import ProfileService from "./profileService";



export const addUser = (user) => dispatch => {
  dispatch(
    {
      type: RETRIEVE_PROFILE,
      payload: user,
    }
  )
};

export const retrieveProfile = () => async (dispatch) => {

  try {

    const res = await ProfileService.get();
    dispatch({

      type: RETRIEVE_PROFILE,
      payload: res.data,

    });

  } catch (err) {


    console.log(err);

  }

};

export const updateProfile = (id, data) => async (dispatch) => {

  try {

    const res = await ProfileService.update(id, data);
    console.log(res.data)
    dispatch({

      type: UPDATE_PROFILE,

      payload: res.data,

    });

    return Promise.resolve(res.data);

  } catch (err) {

    return Promise.reject(err);

  }

};

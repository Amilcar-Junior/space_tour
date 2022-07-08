import http from "../../http";
import auth from '../../utils/auth';


class ProfileService {






  get() {
    const token = auth.getToken();
    return http.get(`/api/users/me/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });


  }


  update(id, data) {
    const token = auth.getToken();
    return http.put(`/api/users/${id}`, data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

  }

}

export default new ProfileService();
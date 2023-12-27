import axios from "axios";

class API {
  static baseURL = "";

  static async ListUsers() {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${API.baseURL}/users?is_doctor=false`,
        headers: {},
      };

      const response = await axios.request(config);

      if (response.status != 200) {
        return false;
      }

      return response.data.data;
    } catch (error) {
      return false;
    }
  }

  static async GetDiagnose(user_id, symptoms) {
    try {
      let data = JSON.stringify({
        user_id: user_id,
        symptoms: symptoms,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${API.baseURL}/diagnose`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);

      //   console.log(response.data.data);
      return response.data.data;
    } catch (error) {
      return false;
    }
  }
}

export { API };

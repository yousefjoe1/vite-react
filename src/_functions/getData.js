import axios from "axios";

export const basUrl = import.meta.env.VITE_REACT_APP_URL;

export const getData = async (apiRoute) => {

    let adminToken = JSON.parse(localStorage.getItem("tkAdmin"));
    try {
      let res = await axios.get(`${basUrl}/api/${apiRoute}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        }
      })
      return res.data;
    } catch (er) {
      console.log(er);
      return er;
    }
  }
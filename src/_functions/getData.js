import axios from "axios";

export const basUrl = import.meta.env.VITE_REACT_APP_URL;

export const getData = async (apiRoute) => {
  try {
      let res = await axios.get(`${basUrl}/api/${apiRoute}`)
      return res.data;
    } catch (er) {
      console.log(er);
      return er;
    }
  }

export const getDataWithAuth = async (apiRoute,auth) => {
  let adminToken = localStorage.getItem(auth);

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
import axios from "axios";

export const baseUrl = import.meta.env.VITE_REACT_APP_URL;
export const getData = async (apiRoute:string) => {
  try {
      let res = await axios.get(`${baseUrl}/api/${apiRoute}`)
      return res.data;
    } catch (er) {
      console.log(er);
      return er;
    }
  }

export const getDataWithAuth = async (apiRoute:string,auth:string) => {
  let adminToken = localStorage.getItem(auth);

    try {
      let res = await axios.get(`${baseUrl}/api/${apiRoute}`, {
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
import axios from "axios";
import Cookies from "js-cookie";

const baseUrl = process.env.REACT_APP_BASE_URL;
let headers = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"
  },
};


export const apiPostRequest = async (api, json) => {
  try {
    headers.headers['Authorization'] = `Bearer ${Cookies.get("auth_token")}`;
    const response = await axios.post(api, json, headers);
    return response;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error; // You can re-throw the error if needed
  }
};

export const apiGetRequest = async (api) => {
  try {
    headers.headers['Authorization'] = `Bearer ${Cookies.get("auth_token")}`;
    const response = await axios.get(api, headers);
    return response;
  } catch (error) {
    
    console.error("An error occurred:", error);
    throw error; // You can re-throw the error if needed
  }
};


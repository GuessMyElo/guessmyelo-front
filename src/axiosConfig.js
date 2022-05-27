import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.response.use(
  (response) => {
    const data = response.data;
    if(data.constructor === Object) {
        if(data.message) toast.success(data.message);
    }
    return response;
  },
  (error) => {
    const data = error.response.data;
    const status = error.status;

    if (data.constructor === Object) {
      if(data.message) toast.error(data.message);
    } else {
      toast.error(data);
    }
    return Promise.reject(error);
  }
);

export default instance;

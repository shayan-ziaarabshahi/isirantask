import axios from "axios";

const axiosDefaultInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_DOMAIN}/api`
});

export default axiosDefaultInstance;
import axiosDefaultInstance from "axiosApi/defaultInstance";

const getUsers = () => axiosDefaultInstance({
  url:"/users"
});

/* eslint-disable */
export default {
  getUsers
};

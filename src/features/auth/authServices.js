import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  // const response = await axios.post(`${base_url}/auth/login`, user);
  const response = await axios.post(`${base_url}/auth/admin-login`, user);
  // const response = await axios.post(`http://localhost:9000/api/v1/auth/admin-login`, user);

  if (response.data) {
    const { accessToken, email, role, uid } = response.data.data;
    console.log({ accessToken, email, role, uid });
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('uid', uid);
    sessionStorage.setItem('role', role);
    sessionStorage.setItem('email', email)
    // localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
};

export default authService;

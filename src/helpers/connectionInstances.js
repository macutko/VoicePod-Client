import axios from "axios";
import config from "../constants/Config";

const axiosInstance = axios.create({
  baseURL: config.baseURL,
});

axiosInstance.defaults.timeout = 10000;

module.exports = { axiosInstance };

import axios from "axios";
import { CONSTANTS } from "../utils/constants";

export const axiosAPI = axios.create({
  baseURL: CONSTANTS.BASE_URL,
  parse: true,
});

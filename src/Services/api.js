// api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.pressmonitor.com/v1/pm/services",
  headers: {
    cname: "mapp.pressmonitor.co.in",
    "x-api-key": "05d4794add40b8ad0ad76641b02a720c",
  },
});

export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const del = (url) => instance.delete(url);

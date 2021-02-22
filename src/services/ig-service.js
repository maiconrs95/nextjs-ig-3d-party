import axios from "axios";

export const igGraphService = axios.create({
  baseURL: "https://graph.instagram.com",
});

export const igApiService = axios.create({
  baseURL: "https://api.instagram.com",
});

export const fbGraphService = axios.create({
  baseURL: "https://graph.facebook.com",
});


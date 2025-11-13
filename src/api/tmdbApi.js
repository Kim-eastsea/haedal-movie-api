import axios from "axios";
import { API_KEY } from "../config.js";

const BASE = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: BASE,
  params: {
    api_key: API_KEY,
    language: "ko-KR",
  },
  timeout: 10000,
});

function wrapError(err) {
  if (err.response) {
    const msg = `${err.response.status} ${err.response.statusText}`;
    return new Error(`TMDB API error: ${msg}`);
  }
  if (err.request) return new Error("TMDB API error: no response received");
  return new Error(`TMDB API error: ${err.message}`);
}

export async function Top5Movies() {
  try {
    const res = await api.get("/movie/popular", { params: { page: 1 } });
    return res.data && res.data.results ? res.data.results.slice(0, 5) : [];
  } catch (err) {
    throw wrapError(err);
  }
}

export async function searchMovies(query) {
  if (!query) return [];
  try {
    const res = await api.get("/search/movie", { params: { query } });
    return res.data && res.data.results ? res.data.results : [];
  } catch (err) {
    throw wrapError(err);
  }
}

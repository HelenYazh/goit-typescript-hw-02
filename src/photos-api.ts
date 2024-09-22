import axios from "axios";

const API_KEY = "1Y9g4XfeviHr6tCy3KyAXB3JecfEz1szp_gLr2OZ6bI";
axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = `Client-ID ${API_KEY}`;

export const fetchPhotosByKeyword = async (
  page: number,
  keyword: string
): Promise<Photo[]> => {
  const response = await axios.get<ApiResponse>(
    `/search/photos?page=${page}&query=${keyword}`
  );

  return response.data.results;
};

interface ApiResponse {
  total: number;
  total_pages: number;
  results: Photo[];
}

export interface Photo {
  id: string;
  description: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
  };
  likes: number;
}

export interface Urls {
  regular: string;
  small: string;
}

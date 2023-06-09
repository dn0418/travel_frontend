import { API_ENDPOINTS } from "./api-endpoints";
import { HttpClient } from "./http-client";

class Client {
  reviews = {
    all: (page: any, limit: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}?page=${page}&limit=${limit}`),
    // single: () => HttpClient.get(`${API_ENDPOINTS.BASIC_DATA}/1`),
  };

  tours = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURS),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/${id}`),
  }


  // blogData = {
  //   all: () => HttpClient.get(`${API_ENDPOINTS.BLOGS}?populate=%2A`),
  //   getByID: (id: string) => HttpClient.get(`${API_ENDPOINTS.BLOGS}/${id}`),
  //   newBlog: (blog: any) => HttpClient.post(API_ENDPOINTS.BLOGS, blog),
  //   deleteBlog: (id: any) => HttpClient.delete(`${API_ENDPOINTS.BLOGS}/${id}`),
  // };

  // categoryData = {
  //   all: () => HttpClient.get(`${API_ENDPOINTS.CATEGORY}?populate=%2A`),
  // };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();

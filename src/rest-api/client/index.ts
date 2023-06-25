import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class Client {
  reviews = {
    all: (page: any, limit: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}?page=${page}&limit=${limit}`),
    newReview: (review: any) => HttpClient.post(API_ENDPOINTS.NEW_REVIEWS, review),
    carReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/car/${id}`),
    tourReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/tour/${id}`),
    hotelReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/hotel/${id}`),
    deleteReview: (id: any) => HttpClient.delete(`${API_ENDPOINTS.REVIEWS}/${id}`),
  };

  tours = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURS),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/${id}`),
    sortedTour: (page: number, limit: number, type: any) => HttpClient.get(API_ENDPOINTS.TOURS),
  }

  tourType = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURTYPE)
  }

  cars = {
    all: (page?: any, driver?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.CARS}?page=${page}&driver=${driver}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.CARS}/${id}`),
  }

  accessories = {
    all: (page?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.TOUR_ACCESSORIES}?page=${page}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.TOUR_ACCESSORIES}/${id}`),
  }

  hotels = {
    all: () => HttpClient.get(API_ENDPOINTS.HOTELS),
    filtered: (
      page: any,
      type: any,
      search: any,
      country: any,
      city: any
    ) => HttpClient.get(`${API_ENDPOINTS.HOTELS}?page=${page}&type=${type}&search=${search}&country=${country}&city=${city}`),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.HOTELS}/${id}`),
  }

  hotelType = {
    all: () => HttpClient.get(API_ENDPOINTS.HOTELTYPE)
  }

  fileUploads = {
    upload: (data: any) => HttpClient.post(API_ENDPOINTS.FILEUPLOADS, data),
  }


  // blogData = {
  //   all: () => HttpClient.get(`${API_ENDPOINTS.BLOGS}?populate=%2A`),
  //   getByID: (id: string) => HttpClient.get(`${API_ENDPOINTS.BLOGS}/${id}`),
  //   newBlog: (blog: any) => HttpClient.post(API_ENDPOINTS.BLOGS, blog),
  //   deleteBlog: (id: any) => HttpClient.delete(`${API_ENDPOINTS.BLOGS}/${id}`),
  // };

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();

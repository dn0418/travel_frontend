import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class TourClient {
  reviews = {
    tourReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/tour/${id}`),
  };

  tours = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURS),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/${id}`),
    sortedTour: (
      page: number,
      type: any,
      search: any,
      month: any,
      destination: any,
      days: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}?page=${page}&type=${type}&search=${search}&month=${month}&destination=${destination}&days=${days}`),
    deleteById: (id: any) => HttpClient.delete(`${API_ENDPOINTS.TOURS}/delete/${id}`),
  }

  tourType = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURTYPE)
  }

  tourDestination = {
    all: () => HttpClient.get(API_ENDPOINTS.DESTINATION),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.DESTINATION}/delete/${id}`),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.DESTINATION}/update/${id}`, data),
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.DESTINATION}/create`, data)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new TourClient();

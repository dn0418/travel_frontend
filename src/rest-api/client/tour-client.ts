import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class TourClient {
  reviews = {
    tourReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/tour/${id}`),
  };

  tours = {
    all: (language: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}?lan=${language}`),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/${id}`),
    sortedTour: (
      page?: number,
      type?: any,
      search?: any,
      month?: any,
      destination?: any,
      days?: any,
      language?: any) =>
      HttpClient.get(`${API_ENDPOINTS.TOURS}?page=${page}&type=${type}&search=${search}&month=${month}&destination=${destination}&days=${days}&lan=${language}`),
    oneDayTour: (language: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/one-day?lan=${language}`),
    fixedDateTour: (language: any) => HttpClient.get(`${API_ENDPOINTS.TOURS}/fixed-date?lan=${language}`),
    deleteById: (id: any) => HttpClient.delete(`${API_ENDPOINTS.TOURS}/delete/${id}`),
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.TOURS}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.TOURS}/update/${id}`, data),
    createNewImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.TOURS}/image/create`, data),
  }

  tourType = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURTYPE)
  }

  services = {
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.TOUR_SERVICES}/create`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.TOUR_SERVICES}/delete/${id}`),
  }

  departures = {
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.DEPARTURES_PRICING}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.DEPARTURES_PRICING}/update/${id}`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.DEPARTURES_PRICING}/delete/${id}`),
  }

  routes = {
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.TOUR_ROUTES}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.TOUR_ROUTES}/update/${id}`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.TOUR_ROUTES}/delete/${id}`),
  }

  individualPricing = {
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.INDIVIDUAL_PRICING}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.INDIVIDUAL_PRICING}/update/${id}`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.INDIVIDUAL_PRICING}/delete/${id}`),
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

import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class ServiceClient {
  reviews = {
    hotelReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/hotel/${id}`),
    accessoryReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/accessory/${id}`),
    carReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/car/${id}`),
  };

  carWithoutDriver = {
    all: (page?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.CAR_WITHOUT_DRIVER}?page=${page}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/${id}`),
  }

  carWithDriver = {
    all: () => HttpClient.get(API_ENDPOINTS.CAR_WITH_DRIVER),
    newImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.CAR_WITH_DRIVER}/create/image`, data),
    update: (id: number, data: any) => HttpClient.put(`${API_ENDPOINTS.CAR_WITH_DRIVER}/update/${id}`, data),
  }

  airportTransport = {
    all: () => HttpClient.get(API_ENDPOINTS.AIRPORT_TRANSPORT),
    newImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.AIRPORT_TRANSPORT}/create/image`, data),
    update: (id: number, data: any) => HttpClient.put(`${API_ENDPOINTS.AIRPORT_TRANSPORT}/update/${id}`, data),
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
      city: any,
      locale: any,
    ) => HttpClient.get(`${API_ENDPOINTS.HOTELS}?page=${page}&type=${type}&search=${search}&country=${country}&city=${city}&lan=${locale}`),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.HOTELS}/${id}`),
  }

  hotelType = {
    all: () => HttpClient.get(API_ENDPOINTS.HOTELTYPE)
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ServiceClient();

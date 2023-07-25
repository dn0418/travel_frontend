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
    create: (data: any) =>
      HttpClient.post(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/update/${id}`, data),
    delete: (id: any) =>
      HttpClient.delete(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/delete/${id}`),
    createNewImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/image/create`, data),
    createNewPrice: (data: any) => HttpClient.post(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/pricing/create`, data),
    deletePrice: (id: any) => HttpClient.delete(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/pricing/delete/${id}`),
    updatePrice: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/pricing/update/${id}`, data),
  };


  carWithDriver = {
    all: () => HttpClient.get(API_ENDPOINTS.CAR_WITH_DRIVER),
    newImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.CAR_WITH_DRIVER}/create/image`, data),
    update: (id: number, data: any) => HttpClient.put(`${API_ENDPOINTS.CAR_WITH_DRIVER}/update/${id}`, data),
    createPrice: (data: any) => HttpClient.post(`${API_ENDPOINTS.CAR_WITH_DRIVER}/pricing/create`, data),
    deletePrice: (id: number) => HttpClient.delete(`${API_ENDPOINTS.CAR_WITH_DRIVER}/pricing/delete/${id}`),
    updatePrice: (id: number, data: any) => HttpClient.put(`${API_ENDPOINTS.CAR_WITH_DRIVER}/pricing/update/${id}`, data),
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
    deleteByID: (id: any) => HttpClient.delete(`${API_ENDPOINTS.TOUR_ACCESSORIES}/delete/${id}`),
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
    deleteHotels: (id: any) => HttpClient.delete(`${API_ENDPOINTS.HOTELS}/delete/${id}`),
    createNewHotel: (data: any) => HttpClient.post(`${API_ENDPOINTS.HOTELS}/create`, data),
    newImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.HOTELS}/image/create`, data),
    updateHotel: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.HOTELS}/update/${id}`, data),
    createNewPrice: (data: any) => HttpClient.post(`${API_ENDPOINTS.HOTELS}/pricing/create`, data),
    updateHotelPrice: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.HOTELS}/pricing/update/${id}`, data),
    deleteHotelPrice: (id: any) => HttpClient.delete(`${API_ENDPOINTS.HOTELS}/pricing/delete/${id}`),
  };

  hotelType = {
    all: () => HttpClient.get(API_ENDPOINTS.HOTELTYPE),
    deleteType: (id: any) => HttpClient.delete(`${API_ENDPOINTS.HOTELTYPE}/delete/${id}`),
    updateType: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.HOTELTYPE}/update/${id}`, data),
    createType: (data: any) => HttpClient.post(`${API_ENDPOINTS.HOTELTYPE}/create`, data),
  };

  // End
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new ServiceClient();

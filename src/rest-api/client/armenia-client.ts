import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class ArmeniaClient {
  reviews = {
    thingToSeeReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/thing-to-see/${id}`),
    foodAndDrinksReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/food-and-drink/${id}`),
    thingToDoReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/thing-to-do/${id}`),
  };

  thingToSee = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_SEE}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_SEE}/${id}`),
    deleteByID: (id: any) => HttpClient.delete(`${API_ENDPOINTS.THING_TO_SEE}/delete/${id}`),
  }

  thingToDo = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_DO}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_DO}/${id}`),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.THING_TO_DO}/delete/${id}`),
  };


  foodAndDrinks = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.FOOD_AND_DRINKS}/delete/${id}`),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.FOOD_AND_DRINKS}/${id}`),
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ArmeniaClient();

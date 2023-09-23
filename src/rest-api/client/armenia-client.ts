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
    surroundingReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/surrounding/${id}`),
  };

  thingToSee = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_SEE}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_SEE}/${id}`),
    deleteByID: (id: any) => HttpClient.delete(`${API_ENDPOINTS.THING_TO_SEE}/delete/${id}`),
    createNewThing: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.THING_TO_SEE}/create`, data),
    updateThing: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.THING_TO_SEE}/update/${id}`, data),
    newImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.THING_TO_SEE}/image/create`, data),
  }

  thingToDo = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_DO}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_DO}/${id}`),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.THING_TO_DO}/delete/${id}`),
    createNewThing: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.THING_TO_DO}/create`, data),
    updateThing: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.THING_TO_DO}/update/${id}`, data),
    newImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.THING_TO_DO}/image/create`, data),
  };

  surrounding = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.SURROUNDING}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.SURROUNDING}/${id}`),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.SURROUNDING}/delete/${id}`),
    createNewThing: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.SURROUNDING}/create`, data),
    updateThing: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.SURROUNDING}/update/${id}`, data),
    newImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.SURROUNDING}/image/create`, data),
  };

  events = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.EVENTS}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.EVENTS}/${id}`),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.EVENTS}/delete/${id}`),
    createNewEvent: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.EVENTS}/create`, data),
    updateEvent: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.EVENTS}/update/${id}`, data),
    newImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.EVENTS}/image/create`, data),
  };

  blogs = {
    all: (page?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.BLOGS}?page=${page}&search=${search}&lan=${locale}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.BLOGS}/${id}`),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.BLOGS}/delete/${id}`),
    createNewBlog: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.BLOGS}/create`, data),
    updateBlog: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.BLOGS}/update/${id}`, data),
  };

  rubrics = {
    all: () => HttpClient.get(API_ENDPOINTS.RUBRICS),
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.RUBRICS}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.RUBRICS}/update/${id}`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.RUBRICS}/delete/${id}`),
  }

  vacancy = {
    all: (page?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.VACANCY}?page=${page}&search=${search}&lan=${locale}`
    ),
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.VACANCY}/create`, data),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.VACANCY}/update/${id}`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.VACANCY}/delete/${id}`),
    findOne: (id: any) => HttpClient.get(`${API_ENDPOINTS.VACANCY}/${id}`),
  }

  foodAndDrinks = {
    all: (page?: any, type?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}?page=${page}&type=${type}&search=${search}&lan=${locale}`
    ),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.FOOD_AND_DRINKS}/delete/${id}`),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.FOOD_AND_DRINKS}/${id}`),
    createNew: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}/create`, data),
    update: (id: any, data: any) => HttpClient.put(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}/update/${id}`, data),
    newImage: (data: any) => HttpClient.post(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}/image/create`, data),
  }

  brochure = {
    all: (page?: any, search?: any, locale?: string) => HttpClient.get(
      `${API_ENDPOINTS.BROCHURE}?page=${page}&locale=${locale}&search=${search}`
    ),
    findById: (id: any) => HttpClient.get(`${API_ENDPOINTS.BROCHURE}/${id}`),
    create: (data: any) => HttpClient.post(`${API_ENDPOINTS.BROCHURE}/create`, data),
    delete: (id: any) => HttpClient.delete(`${API_ENDPOINTS.BROCHURE}/delete/${id}`),
    update: (id: any, data: any) => HttpClient.put(`${API_ENDPOINTS.BROCHURE}/update/${id}`, data),
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ArmeniaClient();

import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class Client {
  reviews = {
    all: (page: any, limit: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}?page=${page}&limit=${limit}`),
    adminReviews: (page: any, limit: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/admin-reviews?page=${page}&limit=${limit}`),
    newReview: (review: any) => HttpClient.post(API_ENDPOINTS.NEW_REVIEWS, review),
    carReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/car/${id}`),
    thingToSeeReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/thing-to-see/${id}`),
    foodAndDrinksReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/food-and-drink/${id}`),
    thingToDoReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/thing-to-do/${id}`),
    tourReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/tour/${id}`),
    hotelReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/hotel/${id}`),
    accessoryReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/accessory/${id}`),
    deleteReview: (id: any) => HttpClient.delete(`${API_ENDPOINTS.REVIEWS}/delete/${id}`),
    activeReview: (id: any) => HttpClient.get(`${API_ENDPOINTS.REVIEWS}/active/${id}`),
    updateReview: (id: any, review: any) => HttpClient.put(`${API_ENDPOINTS.REVIEWS}/update/${id}`, review),
  };

  ridePlan = {
    newRidePlan: (plan: any) => HttpClient.post(API_ENDPOINTS.NEW_RIDE_PLAN, plan),
  }

  callBack = {
    newCallBack: (input: any) => HttpClient.post(API_ENDPOINTS.NEW_CALLBACK, input),
  }

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
  }

  images = {
    deleteImage: (id: any) => HttpClient.delete(`${API_ENDPOINTS.IMAGES}/delete/${id}`),
  }


  tourType = {
    all: () => HttpClient.get(API_ENDPOINTS.TOURTYPE)
  }

  carWithoutDriver = {
    all: (page?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.CAR_WITHOUT_DRIVER}?page=${page}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.CAR_WITHOUT_DRIVER}/${id}`),
  }

  carWithDriver = {
    all: () => HttpClient.get(API_ENDPOINTS.CAR_WITH_DRIVER),
  }

  airportTransport = {
    all: () => HttpClient.get(API_ENDPOINTS.AIRPORT_TRANSPORT),
    newImage: (data: any) => HttpClient.post(`${API_ENDPOINTS.AIRPORT_TRANSPORT}/create/image`, data),
  }

  thingToSee = {
    all: (page?: any, type?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_SEE}?page=${page}&type=${type}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_SEE}/${id}`),
  }

  thingToDo = {
    all: (page?: any, type?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.THING_TO_DO}?page=${page}&type=${type}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.THING_TO_DO}/${id}`),
  }

  foodAndDrinks = {
    all: (page?: any, type?: any, search?: any) => HttpClient.get(
      `${API_ENDPOINTS.FOOD_AND_DRINKS}?page=${page}&type=${type}&search=${search}`
    ),
    getByID: (id: any) => HttpClient.get(`${API_ENDPOINTS.FOOD_AND_DRINKS}/${id}`),
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

  tourDestination = {
    all: () => HttpClient.get(API_ENDPOINTS.DESTINATION)
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

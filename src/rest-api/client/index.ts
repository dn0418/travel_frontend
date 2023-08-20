import { API_ENDPOINTS } from "../api-endpoints";
import { HttpClient } from "../http-client";

class Client {
  reviews = {
    all: (page: any, limit: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}?page=${page}&limit=${limit}`),
    adminReviews: (page: any, limit: any) =>
      HttpClient.get(
        `${API_ENDPOINTS.REVIEWS}/admin-reviews?page=${page}&limit=${limit}`
      ),
    newReview: (review: any) =>
      HttpClient.post(API_ENDPOINTS.NEW_REVIEWS, review),
    deleteReview: (id: any) =>
      HttpClient.delete(`${API_ENDPOINTS.REVIEWS}/delete/${id}`),
    activeReview: (id: any) =>
      HttpClient.get(`${API_ENDPOINTS.REVIEWS}/active/${id}`),
    updateReview: (id: any, review: any) =>
      HttpClient.put(`${API_ENDPOINTS.REVIEWS}/update/${id}`, review),
  };

  ridePlan = {
    newRidePlan: (plan: any) =>
      HttpClient.post(API_ENDPOINTS.NEW_RIDE_PLAN, plan),
    allPlans: (page: any) => HttpClient.get(
      `${API_ENDPOINTS.RIDE_PLAN}?page=${page}`),
    deletePlan: (id: any) => HttpClient.delete(
      `${API_ENDPOINTS.RIDE_PLAN}/delete/${id}`),
    updatePlan: (id: any, input: any) => HttpClient.put(
      `${API_ENDPOINTS.RIDE_PLAN}/update/${id}`, input),
    getPlan: (id: any) => HttpClient.get(`${API_ENDPOINTS.RIDE_PLAN}/${id}`)
  };

  callBack = {
    newCallBack: (input: any) =>
      HttpClient.post(`${API_ENDPOINTS.CALLBACK}/create`, input),
    allCallBack: (page: any) => HttpClient.get(`${API_ENDPOINTS.CALLBACK}?page=${page}`),
    deleteCallBack: (id: any) => HttpClient.delete(
      `${API_ENDPOINTS.CALLBACK}/delete/${id}`),
    updateCallBack: (id: any, input: any) => HttpClient.put(
      `${API_ENDPOINTS.CALLBACK}/update/${id}`, input),
  };

  images = {
    deleteImage: (id: any) =>
      HttpClient.delete(`${API_ENDPOINTS.IMAGES}/delete/${id}`),
  };

  fileUploads = {
    upload: (data: any) => HttpClient.post(API_ENDPOINTS.FILEUPLOADS, data),
  };

  requestMail = {
    tourMail: (data: any) => HttpClient.post(`${API_ENDPOINTS.MAIL_REQUEST}/tour`, data),
    hotelMail: (data: any) => HttpClient.post(`${API_ENDPOINTS.MAIL_REQUEST}/hotel`, data),
    carMail: (data: any) => HttpClient.post(`${API_ENDPOINTS.MAIL_REQUEST}/car`, data),
    accessoriesMail: (data: any) => HttpClient.post(`${API_ENDPOINTS.MAIL_REQUEST}/accessories`, data),
    miceMail: (data: any) => HttpClient.post(`${API_ENDPOINTS.MAIL_REQUEST}/mice`, data),
  }

  currency = {
    all: () => HttpClient.get(API_ENDPOINTS.CURRENCY),
    update: (data: any) => HttpClient.put(`${API_ENDPOINTS.CURRENCY}/update`, data),
  }

  staticPages = {
    all: () => HttpClient.get(API_ENDPOINTS.STATIC_PAGES),
    update: (data: any) => HttpClient.put(`${API_ENDPOINTS.STATIC_PAGES}/update`, data),
    findOne: (code: any) => HttpClient.get(`${API_ENDPOINTS.STATIC_PAGES}/${code}`),
  }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();

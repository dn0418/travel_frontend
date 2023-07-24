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
  };

  callBack = {
    newCallBack: (input: any) =>
      HttpClient.post(API_ENDPOINTS.NEW_CALLBACK, input),
  };

  images = {
    deleteImage: (id: any) =>
      HttpClient.delete(`${API_ENDPOINTS.IMAGES}/delete/${id}`),
  };

  fileUploads = {
    upload: (data: any) => HttpClient.post(API_ENDPOINTS.FILEUPLOADS, data),
  };
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new Client();

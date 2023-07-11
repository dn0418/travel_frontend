import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import client from './client';

export const useNewReview = () => {
  const { mutate, isLoading, data } = useMutation(client.reviews.newReview, {
    onSuccess: (data) => {
      toast.success('Review Created Successfully!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    },

    onError: (error: Error) => {
      toast.error(error?.message || 'Something went wrong!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      // console.log(error.message);
    },
  });

  return { addNewReview: mutate, isLoading, data };
};
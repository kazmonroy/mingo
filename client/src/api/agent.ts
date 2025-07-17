import { router } from '@/app/router/Routes';
import axios from 'axios';
import { toast } from 'sonner';

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

agent.interceptors.response.use(
  async (response) => {
    if (import.meta.env.DEV) {
      await sleep(1000);
    }

    return response;
  },
  async (error) => {
    if (import.meta.env.DEV) {
      await sleep(1000);
    }

    console.log('Axios Error:', error);

    const { status, data } = error.response || {};

    switch (status) {
      case 400:
        if (data?.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast(data?.title || data?.error || 'Bad Request');
        }

        break;
      case 401:
        console.error('Bad Request:', error.response?.data);
        toast(error.response?.data?.title || 'Unauthorized');
        break;
      case 404:
        toast(data?.title || 'Not Found');
        router.navigate('/not-found');
        break;
      case 500:
        router.navigate('/server-error', { state: { error: data } });
        toast(error.response?.data?.title || 'Server Error');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default agent;

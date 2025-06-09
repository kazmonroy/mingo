import { router } from '@/app/router/Routes';
import axios from 'axios';
import { toast } from 'sonner';

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};
const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    return response;
  },
  async (error) => {
    await sleep(1000);
    console.log('Axios Error:', error);

    const { status } = error.response || {};

    switch (status) {
      case 400:
        console.error('Bad Request:', error.response?.data);
        toast(error.response?.data?.title || 'Bad Request');
        break;
      case 401:
        console.error('Bad Request:', error.response?.data);
        toast(error.response?.data?.title || 'Unauthorized');
        break;
      case 404:
        toast(error.response?.data?.title || 'Not Found');
        router.navigate('/not-found');
        break;
      case 500:
        console.error('Server Error:', error.response?.data);
        toast(error.response?.data?.title || 'Server Error');
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

export default agent;

import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {TPost} from '../Components/Item';

const baseQuery = ['base-query'];

export const getAPIQuery = () =>
  useQuery({
    queryKey: baseQuery,
    queryFn: async () => {
      try {
        const options = {
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/posts',
          params: {},
        };
        const response = await axios.request<TPost[]>(options);
        console.log('DATA:', response.data);

        return response;
      } catch (error) {
        console.log('ERROR:', error);
        throw new Error('Error fetching data');
      }
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 0,
    retry: 1,
  });

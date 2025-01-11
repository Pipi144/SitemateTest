import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {TAPIResponse} from '../Models/utilityTypes';
import {TNew} from '../Models/news';
type TQueryParams = {
  q?: string; //search string
  apiKey: string;
};
export const newsQuery = ['news-query'];
export const generateQueryKey = (search?: string) => {
  return [newsQuery, search];
};
export const getAPIQuery = (search?: string) =>
  useQuery({
    queryKey: generateQueryKey(search),
    queryFn: async () => {
      const params: TQueryParams = {
        apiKey: 'f9eac123388349c79e7d3464832d85c2',
      };
      if (search) {
        params.q = search;
      }
      try {
        const options = {
          method: 'GET',
          url: 'https://newsapi.org/v2/everything',
          params,
        };
        const response = await axios.request<TAPIResponse<TNew>>(options);

        return response;
      } catch (error) {
        console.log('ERROR:', error);
        throw new Error('Error fetching data');
      }
    },
    enabled: Boolean(search),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchInterval: 0,
    retry: 1,
  });

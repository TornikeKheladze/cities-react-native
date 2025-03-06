import axios from 'axios';
import {City} from './types/shared';

export const cityInstance = axios.create({
  baseURL:
    'http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=12&hateoasMode=off',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCities: () => Promise<{
  data: City[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}> = () => cityInstance.get('').then(res => res.data);

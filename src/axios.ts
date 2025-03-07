import axios from 'axios';
import {City} from './types/shared';

export const cityInstance = axios.create({
  baseURL: 'http://geodb-free-service.wirefreethought.com/v1/geo/cities',
  //   baseURL:
  //     'http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=1&hateoasMode=off',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const getCities: (offset: number) => Promise<{
  data: City[];
  metadata: {
    currentOffset: number;
    totalCount: number;
  };
}> = offset => {
  return (
    cityInstance
      .get(`?limit=10&offset=${offset}&hateoasMode=off`)
      //   .get('')
      .then(res => res.data)
  );
};

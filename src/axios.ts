import axios from 'axios';
import {City} from './types/shared';
import {API_KEY} from './data/data';

export const cityInstance = axios.create({
  baseURL: 'http://geodb-free-service.wirefreethought.com/v1/geo/cities',
  //   baseURL:
  //     'http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=1&hateoasMode=off',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const weatherInstance = axios.create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
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
      .get(`?limit=10&offset=${offset}`)
      //   .get('')
      .then(res => res.data)
  );
};

export const getWeatherData: (
  lat: number,
  lon: number,
) => Promise<{main: {temp: number}}> = (lat, lon) => {
  return weatherInstance
    .get(`weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.data);
};

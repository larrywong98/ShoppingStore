import axios from 'axios';//!!!!
import qs from 'querystring';

const errorHandle = (status, info) => {
  // handle error
  switch (status) {
    case 400:
      console.log("Bad request"); 
      break;
    case 401:
     console.log("Unauthorized"); 
      break;
    case 403:
      console.log("Forbidden"); 
      break;
    case 404:
      console.log("Not found"); 
      break;

    default:
      console.log(info);
      break;
  }
}

  // Create the error response object
  const instance =axios.create({
    // baseURL: 'https://localhost:8080'
    timeout:5000
  }) 

  instance.interceptors.request.use(
    (config) => {
      if (config.method === 'post') {
        config.data = qs.stringify(config.data);
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      // console.log('Response received:', response);
      if (response.status === 200) {
        return Promise.resolve(response);
      } else {
        return Promise.reject('Response status is not 200 OK');
      }
    },
    (error) => {
      const { response } = error;
      // console.log('Error response:', response.data);
      errorHandle(response.status, response.info);
      return Promise.reject(error);
    }
  );


export default instance;

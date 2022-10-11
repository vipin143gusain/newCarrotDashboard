import { sentry_logger } from '@/utils/sentry_logger';

interface _serveProps {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
}

let token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImJ1c2luZXNzIjpbeyJrZXkiOiIyNzkiLCJsYWJlbCI6IjIxRm9vbHMifV0sIm1hbmFnZXJpZCI6MjQwLCJjaGFubmVsdHlwZSI6IkNBUlJPVCIsInJvbGVpZCI6IjIifSwiaWF0IjoxNjY1NDExNzQyLCJleHAiOjE2NjYwMTY1NDJ9.Tcdru9AlPUjSsY4RHhrPDf_tJuSmwV8CbsB1YS5_ZRN2OF0XNZp7gsJRwDV578bXGGMR_I7ZqJ2czE2RvQw1jJaJ5Uhu_i6QtJ8Q2G-Q8YUUY3gyotcOzzybZO2mLzhMsy8sjtg9Zh7fQpmbtHjWPwxkpE9UB8YhyzyAvuHc_Cuw0D35BhuWULn-ladFUNmwUjeOO9cU7gtdKemHbZHr8JFTItPAxR8_tFxlsDoy2W3acT6GuBccjrA2yBk8-lrW7sVNwUwjIhTh75papwjw_vS3saJJ9YOntn71iEJCKN6zyEEB1vmxzNNxiAlAno958uMpydf2snXwvuXuk-WrNQ"

export const _serveAPI = async (props: _serveProps) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { endPoint, method, data } = props;
  return fetch(baseURL + endPoint, {
    method: method,
    headers: {
      'content-type': 'application/json',
      token: token
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((data) => {
      return data;
    })
    .catch((err) =>
      sentry_logger({
        error: err,
        trace: 'Calling API endpoint:' + endPoint,
        user: {
          key: 'Test',
          id: '1',
          ip_address: '1.0.1.0.1.0',
          email: 'test@test.com',
          username: 'Vipin_admin'
        }
      })
    );
};


// export const _deleteProductAPI = async (props: _serveProps) => {
//   localStorage.setItem('apiToken', token);
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const { endPoint, method, data } = props;

//   return fetch(baseURL + endPoint, {
//     method: method,
//     headers: {
//       token: localStorage.getItem('apiToken')
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((err) => err);
// };
// export const _deleteCategoryAPI = async (props: _serveProps) => {
//   localStorage.setItem('apiToken', token);
//   const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
//   const { endPoint, method, data } = props;

//   return fetch(baseURL + endPoint, {
//     method: method,
//     headers: {
//       token: localStorage.getItem('apiToken')
//     },
//     body: JSON.stringify(data)
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//       return data;
//     })
//     .catch((err) => err);
// };

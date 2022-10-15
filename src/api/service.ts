import { sentry_logger } from '@/utils/sentry_logger';

interface _serveProps {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
}

let token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImJ1c2luZXNzIjpbeyJrZXkiOiIyNzkiLCJsYWJlbCI6IjIxRm9vbHMifV0sIm1hbmFnZXJpZCI6MjU1LCJjaGFubmVsdHlwZSI6IkNBUlJPVCIsInJvbGVpZCI6IjEifSwiaWF0IjoxNjY1ODI3MzU4LCJleHAiOjE2NjY0MzIxNTh9.NW6ABLxQgaGqDjTLGbsoVMULZK5p9gE3E6X7TL82OQgOZbm4IcA7mTE25naEpFIhFUayRazOT0y9JuB8sW4Xjkx25BZD6g-wvF1ZDNRsUO97YjIwTFY6J0tS0oKFCPty9WRRkXk81Mz9K9AnW0H17zbw9cIIR0wRaZLakyDdJqkh_6NsnpDqrLy1qiWbHTmKx2__2JbzHFKpS03uaHojmF2NGVu1S4tAcGkej1MMv33CAzlNcwn0o9H1khtbmAVORWjoO1D6h58w8NLOzhfkxjSI1crtJNutmRD-WlGbfZ0jGAjMQs2wvnGVYcVTlpCd1TD90Us1Ruh5PbdxVnB8Zw"

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

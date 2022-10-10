import { sentry_logger } from '@/utils/sentry_logger';

interface _serveProps {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
}

let token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImJ1c2luZXNzIjpbeyJrZXkiOiIyNzkiLCJsYWJlbCI6IjIxRm9vbHMifV0sIm1hbmFnZXJpZCI6MjU1LCJjaGFubmVsdHlwZSI6IkNBUlJPVCIsInJvbGVpZCI6IjEifSwiaWF0IjoxNjY1MjIxODc1LCJleHAiOjE2NjU4MjY2NzV9.TYz0rwrMjmZXNJmike1WLqM-vA84Ado9iZiXuMDhnP6cIlmrZOimFRs9H0pv3n7QEA1tfVa1pDT9qmYut8n8DaapsMXAlm3XFhT0QMpGAqnAP1lFoScmlW4DIao_5Q0yajprV_uDrz0lCkQK2Na-OmQm1c-McMoeBEE13TlH73RpPCiGP7t_0sdx5vZw9nToAC4cXLU7RREiNTBTz60qJ_RYrlw-PRTLwj6vSDxAtbYGUlRzJKsvYBNJM41zr5H8E7hvhjdbjITXMjd7kGuEHMlH1b7wJGrRxQhpAu0I8J-3hHi2z3EZdWHiYF-1ZiYSK49NKhgLY5eB_l5x7RMrWA"

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

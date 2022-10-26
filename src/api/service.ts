import { sentry_logger } from '@/utils/sentry_logger';

interface _serveProps {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
}

let token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImJ1c2luZXNzIjpbeyJrZXkiOiIyNzkiLCJsYWJlbCI6IjIxRm9vbHMifV0sIm1hbmFnZXJpZCI6MjU1LCJjaGFubmVsdHlwZSI6IkNBUlJPVCIsInJvbGVpZCI6IjEifSwiaWF0IjoxNjY2ODAzNTk3LCJleHAiOjE2Njc0MDgzOTd9.j3KjZH8TTk7eEZSLrOEcxCwroeV-02glDrKLUSFj9aCBUTdbIA5lcWb3X6e2cf7vf7iywThAoobIbztPO9SvU1Ux9e3nSxHPOOlZhtF9ykm1-CPak3BdBU24R0Xc6VZvMvSEeJQlgl2q8ONXDb8KA4Qkq7fO_Ct7kfJ6hToiA3zzlkvsYYwEsUS5XaUCj4Bebis94AfE6jl1CaKRRZRn854G1mjT1Q5_A_EeiN5cEfym3lHsqYteNBLIHmryWM2ti7P-7R4pTNw9clVxJFNUqr4He7HoC_AEtGDNwWLRSvGlq9ZyYHaKppDKC_Wz-mzeO7KPNMbaTK2byuPBwh6Z4g"

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

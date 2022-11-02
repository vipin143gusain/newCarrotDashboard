import { sentry_logger } from '@/utils/sentry_logger';
import { getCookies } from 'cookies-next';

interface _serveProps {
  endPoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: any;
}


export const _serveAPI = async (props: _serveProps) => {
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { endPoint, method, data } = props;
 let token_from_cookie = getCookies('token')
  return fetch(baseURL + endPoint, {
    method: method,
    headers: {
      'content-type': 'application/json',
      token: token_from_cookie.token
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



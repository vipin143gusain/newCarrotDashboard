import BaseLayout from '@/layouts/base.layout';
import { ReactElement } from 'react';

import Hero from '@/components/hero.component';
import { NextPage } from 'next';



const Overview: NextPage = () => {

  return <Hero />;
};



export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps({ req }) {
  const req_cookies = req.cookies;
  console.log('req login', req_cookies);

  if (JSON.stringify(req_cookies) === '{}') {
    console.log('empty obj');
    
  } else {
    console.log(' non empty obj');
    return {
      redirect: {
        destination: '/dashboards',
        permanent: false
      }
    };
  }

  const token = 'asdasd';

  return {
    props: { token }
  };
}


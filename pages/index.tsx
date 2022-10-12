import { ReactElement } from 'react';
import BaseLayout from '@/layouts/base.layout';

import Hero from '@/components/hero.component';
import { NextPage } from 'next';

// const HeaderWrapper = styled(Card)(
//   ({ theme }) => `
//   width: 100%;
//   display: flex;
//   align-items: center;
//   height: ${theme.spacing(10)};
//   margin-bottom: ${theme.spacing(10)};
// `
// );

// const OverviewWrapper = styled(Box)(
//   ({ theme }) => `
//     overflow: auto;
//     background: ${theme.palette.common.white};
//     flex: 1;
//     overflow-x: hidden;
// `
// );

const Overview: NextPage = () => {
  // const { username } = useContext(LoginContext);
  // const router = useRouter();
  // useEffect(() => {
  //   console.log('user', username);
  //   username !== '' ? router.push('/dashboards/tasks') : router.push('/');
  // }, [username]);
  return <Hero />;
};



export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

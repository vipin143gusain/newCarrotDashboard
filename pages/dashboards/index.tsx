import Footer from '@/components/footer.component';
import TaskSearch from '@/components/tab_views.component';
import SidebarLayout from '@/layouts/side_bar';
import { addOffer } from '@/store/slices/add_offer';
import { feedCards } from '@/store/slices/feed';
// include styles
// import categoryData from '@/mockData/categoryData.json';
// import feedData from '@/mockData/feedData.json';
// import productData from '@/mockData/productData.json';
// import { wrapper } from '@/store';
import { getModalState } from '@/store/slices/modal_watcher';
import { walletCategory } from '@/store/slices/wallet_category';
import { walletProduct } from '@/store/slices/wallet_product';
// import { selectProfile, setProfileData } from '@/store/slices/profile';
import {
  CategoryTwoTone,
  DynamicFeedTwoTone,
  Info,
  Inventory2TwoTone
} from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  styled,
  Tab,
  Tabs
} from '@mui/material';
import Head from 'next/head';
import ManagementUserProfile from 'pages/management/profile/index';
import { ChangeEvent, useState } from 'react';
import {
  // useDispatch,
  useSelector
} from 'react-redux';
import 'rodal/lib/rodal.css';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
      bottom:5px ;
      margin-bottom: 20px;
    }
`
);

const TabsWrapperContainer = styled(Grid)(
  () => `
    position: fixed;
    width: 100%;
    z-index: 1000;
    height:60px;
    margin-top:-10px;
    padding:20px;
    background-color: #070C27;
    border-bottom:2px;
    border-bottom-color: red
`
);

function DashboardTasks(props) {
  const { resolvedUrl } = props;

  // const profile = useSelector(selectProfile);
  const modalCurrentState = useSelector(getModalState);
  // const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState<string>('about');
  // const [arr, setarr] = useState([])
  const feedData = useSelector(feedCards);
  const productData = useSelector(walletProduct);
  const categoryData = useSelector(walletCategory);
  const addOfferData = useSelector(addOffer);

  const tabs = [
    { value: 'about', label: 'About', tabicon: <Info /> },
    {
      value: 'walletproducts',
      label: 'Wallet Products',
      tabicon: <Inventory2TwoTone />
    },
    {
      value: 'walletcategories',
      label: 'Wallet Categories',
      tabicon: <CategoryTwoTone />
    },
    { value: 'feed', label: 'Feed', tabicon: <DynamicFeedTwoTone /> },
    { value: 'addOffer', label: 'Add Offer', tabicon: <DynamicFeedTwoTone /> }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Tasks Dashboard</title>
      </Head>

      <Container maxWidth="lg" sx={{ marginTop: '10px' }}>
        <TabsWrapperContainer
          xs={12}
          style={{
            zIndex: modalCurrentState == true ? 0 : 1000
          }}
        >
          <TabsWrapper
            onChange={handleTabsChange}
            value={currentTab}
            variant="scrollable"
            scrollButtons="auto"
            textColor="primary"
            indicatorColor="primary"
          >
            {tabs.map((tab) => (
              <Tab
                icon={currentTab === tab.value ? tab.tabicon : null}
                iconPosition="start"
                key={tab.value}
                label={tab.label}
                value={tab.value}
              />
            ))}
          </TabsWrapper>
        </TabsWrapperContainer>
        <Divider />
        {resolvedUrl}

        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={0}
        >
          {currentTab === 'about' && (
            <>
              <ManagementUserProfile />
            </>
          )}
          {currentTab === 'walletproducts' && (
            <Grid item xs={12}>
              <Box p={1}>
                <TaskSearch
                  searchPlaceholder="Search Wallet Products"
                  onSearchPress={() => alert('Search Wallet Products')}
                  tsType="WALLET_PRODUCT"
                  data={productData}
                />
              </Box>
            </Grid>
          )}
          {currentTab === 'walletcategories' && (
            <Grid item xs={12}>
              <Box p={1}>
                <TaskSearch
                  searchPlaceholder="Search Wallet Categories"
                  onSearchPress={() => alert('Search Wallet Categories')}
                  tsType="WALLET_CATEGORY"
                  data={categoryData}
                />
              </Box>
            </Grid>
          )}
          {currentTab === 'feed' && (
            <Grid item xs={12}>
              <Box p={1}>
                <TaskSearch
                  data={feedData}
                  searchPlaceholder="Search Feed"
                  onSearchPress={() => alert('Search Feed')}
                  tsType="WALLET_FEED"
                />
              </Box>
            </Grid>
          )}
          {currentTab === 'addOffer' && (
            <Grid item xs={12}>
              <Box p={1}>
                <TaskSearch
                  data={addOfferData}
                  searchPlaceholder="Search Feed"
                  onSearchPress={() => alert('Search Feed')}
                  tsType="ADD_OFFER"
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

// export const getServerSideProps = wrapper.getServerSideProps(store => async({resolvedUrl})=>{
//   console.log('ctx', resolvedUrl);

//   store.dispatch(setProfileData('My Name is Evan'))
//   return {
//     props:{
//       resolvedUrl
//     }
//   }
// })

//       store.dispatch(setProfileData('My Name is Evan'));
//       return {
//         props: {
//           resolvedUrl
//         }
//       };
//     }
// );

export default DashboardTasks;

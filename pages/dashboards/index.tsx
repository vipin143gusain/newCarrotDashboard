import Footer from '@/components/footer.component';
import TaskSearch from '@/components/tab_views.component';
import SidebarLayout from '@/layouts/side_bar';
import { addOffer } from '@/store/slices/add_offer';
import {
  feedCards,
  getChannel,
  getFeedCategory,
  getFeedSubCategory,
  getFeedTags,
  getFeedTheme
} from '@/store/slices/feed';
import { useEffect } from 'react';

import { categoryList, subCategoryList } from '@/store/slices/feed';
import { getModalState, setModalState } from '@/store/slices/modal_watcher';
import { changeTab } from '@/store/slices/search';
import { walletCategory } from '@/store/slices/wallet_category';
import { walletProduct } from '@/store/slices/wallet_product';

import GridTable from '@/components/table.component';
import { AppDispatch } from '@/store';
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
  Grid, styled,
  Tab, Tabs
} from '@mui/material';
import Head from 'next/head';
import ManagementUserProfile from 'pages/management/profile/index';
import { ChangeEvent, useState } from 'react';
import {
  useDispatch,

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
  const dispatch = useDispatch<AppDispatch>();

  // const profile = useSelector(selectProfile);
  const modalCurrentState = useSelector(getModalState);
  const categoryListData = useSelector(categoryList);
  const subCategoryListData = useSelector(subCategoryList);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    { value: 'addOffer', label: 'Add Offer', tabicon: <DynamicFeedTwoTone /> },
    { value: 'carrot_category', label: 'Categories', tabicon: <DynamicFeedTwoTone /> },
    { value: 'carrot_subcategory', label: 'Sub Categories', tabicon: <DynamicFeedTwoTone /> }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
    dispatch(changeTab(value));
  };

  

  useEffect(() => {
    dispatch(getFeedCategory());
    dispatch(getFeedSubCategory());
    dispatch(getFeedTheme());
    dispatch(getFeedTags());
    dispatch(getChannel());
  }, [dispatch]);




const statusOptions = [
  {
    id: 'all',
    name: 'All'
  },
  {
    id: 'active',
    name: 'Active'
  },
  {
    id: 'inactive',
    name: 'Inactive'
  },
 
];

const active = {
  0: {
    text: 'Inactive',
    color: 'error'
  },
  1: {
    text: 'Active',
    color: 'success'
  }
};



const category_headers = [{
  name:'ID'
},{name:'Category'},{name:'Hex Code'},{name:'Status'},{name:'Actions'}]

const subcategory_headers = [{
  name:'ID'
},{name:'Sub Category'},{name:'Categories'},{name:'Status'},{name:'Actions'}]


  const TabSwitcher = (tabname: string) => {
    switch (tabname) {
      case 'about':
        return <ManagementUserProfile />;

      case 'walletproducts':
        return (
          <TaskSearch
            searchPlaceholder="Search Wallet Products"
            onSearchPress={() => alert('Search Wallet Products')}
            tsType="WALLET_PRODUCT"
            data={productData}
          />
        );

      case 'walletcategories':
        return (
          <TaskSearch
            searchPlaceholder="Search Wallet Categories"
            onSearchPress={() => alert('Search Wallet Categories')}
            tsType="WALLET_CATEGORY"
            data={categoryData}
          />
        );

      case 'feed':
        return (
          <TaskSearch
            data={feedData}
            searchPlaceholder="Search Feed"
            onSearchPress={() => alert('Search Feed')}
            tsType="WALLET_FEED"
          />
        );

      case 'addOffer':
        return (
          <TaskSearch
            data={addOfferData}
            searchPlaceholder="Search Feed"
            onSearchPress={() => alert('Search Feed')}
            tsType="ADD_OFFER"
          />
        );

      case 'carrot_category':
      return (
      <GridTable  
      gridHeaders={category_headers} 
      gridType='CATEGORY' 
      data={categoryListData} 
      title="Carrot Category" 
      filters_suited={statusOptions} 
      customStatusLabel={active}
      onAdd={()=>dispatch(setModalState(true))}
      onEdit={()=>alert('Edited')}
      onDelete={()=>alert('Deleted')}

      />
      )

      case 'carrot_subcategory':
      return (
      <GridTable 
      gridHeaders={subcategory_headers} 
      gridType='SUBCATEGORY' 
      data={subCategoryListData} 
      title="Carrot Sub Category" 
      filters_suited={statusOptions} 
      customStatusLabel={active}
      onAdd={()=>dispatch(setModalState(true))}
      onEdit={()=>alert('Edited')}
      onDelete={()=>alert('Deleted')}

      />
      )

      default:
      return <h4>Unknown Tab</h4>
    }
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
          <Grid item={true} xs={12}>
            <Box p={1}>{TabSwitcher(currentTab)}</Box>
          </Grid>
        </Grid>
      </Container>
      <Footer />

      
    </>
  );
}

DashboardTasks.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardTasks;

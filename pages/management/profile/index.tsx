
import SidebarLayout from '@/layouts/side_bar';
import Head from 'next/head';

import { Container, Grid } from '@mui/material';

import ProfileCover from '@/components/about.component';
import { setModalState } from '@/store/slices/modal_watcher';
// import Feed from 'oldrefs/content/Management/Users/details/Feed';
// import PopularTags from 'oldrefs/content/Management/Users/details/PopularTags';
// import ProfileCover from '@/content/Management/Users/details/ProfileCover';
// import RecentActivity from 'oldrefs/content/Management/Users/details/RecentActivity';
import { brand } from '@/store/slices/brand';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ManagementUserProfile = () => {
  const [userCreated, setuserCreated] = useState('');
  const brandInfo = useSelector(brand);

  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      setuserCreated('yes');
    }, 1500);
  }, []);
  const [roleID, setroleID] = useState<number>(1);
  return (
    <>
      <Head>
        <title>Brand Details - Management</title>
      </Head>
      <Container sx={{ mt: 5 }} maxWidth="lg">
        {userCreated !== 'no' ? (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} md={8}>
              <ProfileCover
                user={brandInfo}
                onCoverImageClick={() => dispatch(setModalState(true))}
                onProfileImageClick={() => dispatch(setModalState(true))}
              />
            </Grid>

            {brandInfo.name ? (
              <>
                {/* <Grid item xs={12} md={4}>
                  <RecentActivity />
                </Grid> */}
                {/* <Grid item xs={12} md={8}>
              <Feed offerData={offerData} feedType="offers" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularTags tags={tags}  display_type="tags" />
            </Grid>
            <Grid item xs={12} md={8}>
              <Feed data={feedData} feedType="products" />
            </Grid>
            <Grid item xs={12} md={4}>
              <PopularTags categories={categories} display_type="category" />
            </Grid> */}
              </>
            ) : null}
          </Grid>
        ) : null}
      </Container>
    </>
  );
};

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;

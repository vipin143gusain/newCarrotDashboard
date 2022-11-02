
import SidebarLayout from '@/layouts/side_bar';
import Head from 'next/head';

import { Container, Grid } from '@mui/material';

import ProfileCover from '@/components/about.component';
import { setModalState } from '@/store/slices/modal_watcher';

import RecentActivity from '@/components/recent_activity.component';
import { brand } from '@/store/slices/brand';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ManagementUserProfile = () => {
  const [userCreated, setuserCreated] = useState('');
  const brandInfo = useSelector(brand);
  const profileInfo = useSelector(state=>state.profile.profile)

  const dispatch = useDispatch();


 
  const [roleID, setroleID] = useState<number>(parseInt(profileInfo.carrotrole));
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

            {profileInfo.carrotrole=="1" ? (
              <>
                <Grid item xs={12} md={4}>
                  <RecentActivity />
                </Grid>
               
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

import Footer from '@/components/footer.component';
import PageTitleWrapper from '@/components/page_title_wrapper.component';
import SidebarLayout from '@/layouts/side_bar';
import { Container, Grid, Tab, Tabs } from '@mui/material';
import { styled } from '@mui/material/styles';
import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

import ActivityTab from '@/components/activity.component';
import EditProfileTab from '@/components/edit_profile.component';
import NotificationsTab from '@/components/notification.component';
import ParentHead from '@/components/parent_head.component';
import QualityControl from '@/components/quality_control.component';
import SecurityTab from '@/components/security.component';

const TabsWrapper = styled(Tabs)(
  () => `
    .MuiTabs-scrollableX {
      overflow-x: auto !important;
    }
`
);

function ManagementUserSettings() {
  const [currentTab, setCurrentTab] = useState<string>('activity');

  const tabs = [
    { value: 'activity', label: 'Activity' },
    { value: 'edit_profile', label: 'Edit Profile' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Passwords/Security' },
    { value: 'qcchecks', label: 'Quality Check' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Quality Controlzone</title>
      </Head>
      <PageTitleWrapper>
       <ParentHead mainHeader='Quality Controlzone' subHeader='Approvals, rejections and on hold checkzone for your products, wallets, feed and about  changes.'/>
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <TabsWrapper
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </TabsWrapper>
          </Grid>
          <Grid item xs={12}>
            {currentTab === 'activity' && <ActivityTab />}
            {currentTab === 'edit_profile' && <EditProfileTab />}
            {currentTab === 'notifications' && <NotificationsTab />}
            {currentTab === 'security' && <SecurityTab />}
            {currentTab === 'qcchecks' && <QualityControl />}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;

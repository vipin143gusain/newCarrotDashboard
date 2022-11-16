import { useContext, useRef, useState } from 'react';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import * as loaderIcon from '@/public/static/images/loaders/carrot-loader-2x.json';
import Lottie from 'react-lottie';


import { LoginContext } from '@/contexts/login.context';
import { AppState } from '@/store';
import { clearProfileData } from '@/store/slices/profile';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { styled } from '@mui/material/styles';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${theme.palette.secondary.main};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${lighten(theme.palette.secondary.main, 0.5)}
`
);

function HeaderUserbox() {
  let sd = {};

  const profile = useSelector<AppState>((state) => state.profile.profile);
  if (typeof window !== 'undefined') {
    // Perform localStorage action
    //  sd = JSON.parse(sessionStorage.getItem('user'));
    // console.log('SD', sd)
  }
  const user = {
    name: profile.firstname + ' ' + profile.lastname,
    avatar: '/static/images/placeholders/covers/profileIcon.jpg',
    jobtitle: 'Brand User Account'
  };

  const dispatch = useDispatch();
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { username } = useContext(LoginContext);
  const router = useRouter();

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleLogOut = async(): void => {
    setIsLoading(true)
    await dispatch(clearProfileData());
    deleteCookie('token', { path: '/', sameSite: true });
    let logoutTimer
    logoutTimer = setTimeout(() => {
      setIsLoading(false)
      if(logoutTimer){
        clearTimeout(logoutTimer)
      }
      router.replace('/');
    }, 3000);
  };

  return (
    <>

      <UserBoxButton color="secondary" ref={ref} onClick={handleOpen}>
        <Avatar alt={user.name} src={user.avatar} />
        <Hidden mdDown>
          <UserBoxText>
            <UserBoxLabel variant="body1">{username}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user.name}</UserBoxDescription>
          </UserBoxText>
        </Hidden>
        <Hidden smDown>
          <ExpandMoreTwoToneIcon sx={{ ml: 1 }} />
        </Hidden>
      </UserBoxButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2" style={{marginTop:'10px'}}>
              {user.jobtitle}
            </UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <NextLink href="/management/profile/settings" passHref>
            <ListItem button>
              <AccountTreeTwoToneIcon fontSize="small" />
              <ListItemText primary="Quality ControlZone" />
            </ListItem>
          </NextLink>
        </List>
        <Divider />
        {
          isLoading&&
          <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: loaderIcon
        }}
        height={150}
        width={150}
        // isStopped={this.state.isStopped}
        // isPaused={this.state.isPaused}
      />
        }
        {
          !isLoading&&
        <Box sx={{ m: 1 }}>
          <Button color="primary" fullWidth onClick={handleLogOut}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
        }
      </Popover>
    </>
  );
}

export default HeaderUserbox;

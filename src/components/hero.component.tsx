import { _serveAPI } from '@/api/service';
import { ProfileProps } from '@/models/interfaces/profile';
import { AppDispatch } from '@/store';
import { getUser } from '@/store/slices/profile';
import { Alert, Snackbar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { setCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Crafted By © '}
      <Link color="inherit" href="https://getcarrot.in/">
        Carrot
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export interface Credentials {
  loginid: string;
  password: string;
}

export default function SignInSide() {
  const [user, setUser] = useState<Credentials>({ loginid: '', password: '' });
  const [userData, setuserData] = useState<any>({});
  const [message, setmessage] = useState<String>('');
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector<ProfileProps>((state) => state.profile.profile);

  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('user', user);
    dispatch(getUser(user));
    setuserData(profile);
  };

  useEffect(() => {
    if (profile?.firstname !== '') {
      console.log('UserNOW', profile);
      sessionStorage.setItem('user', JSON.stringify(profile));
      _serveAPI({
        endPoint: 'api/campaign/getbusinesstoken',
        method: 'POST',
        data: {
          business: profile.business ? JSON.parse(profile.business) : null,
          channeltype: 'CARROT',
          managerid: profile.id,
          roleid: profile.carrotrole
        }
      }).then((res) => {
        console.log(res);
        let token = '';
        console.log('token', res);
        token = res.data.token;

        if (token.includes('ey')) {
          setCookie('token', token, {path:'/', sameSite:true});
          router.push('dashboards');
        } else {
          router.replace('/');
        }
      });
    }
  
  }, [profile]);

  return (
    <>
      {message !== '' ? (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <Alert severity="error" style={{ color: '#fff' }}>
            {'Error : ' + message}
          </Alert>
        </Snackbar>
      ) : null}

      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '15%'
            }}
          >
            <Image
              src={'/static/images/assets/carrotLogo.png'}
              width="130"
              height="30"
            />

            <Box
              sx={{
                marginTop: '10px'
              }}
            >
              <Typography variant="h4" style={{ marginTop: '15%' }}>
                Please Sign in to continue
              </Typography>
            </Box>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%'
              }}
            >
              <TextField
                required
                id="outlined-required"
                label="Email Address"
                autoComplete="off"
                onChange={(e) => setUser({ ...user, loginid: e.target.value })}
              />

              <TextField
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                sx={{ marginTop: '10px' }}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Typography>___________________________</Typography>
                </Grid>
                <Grid item>
                  <Typography>___________________________</Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}


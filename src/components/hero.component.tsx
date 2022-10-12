import { _serveAPI } from '@/api/service';
import * as animationData2 from '@/public/static/images/loaders/web7.json';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Lottie from 'react-lottie';

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

export default function SignInSide() {
  



  const router = useRouter();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password')
    });
  };

  useEffect(() => {
    let logindata = {
      loginid:"Vipin_admin",
      password:"alpha@123"
    };
    _serveAPI({
      endPoint: 'login',
      method: 'POST',
      data: logindata
    }).then((res) => console.log('console.log', res));
  }, []);
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7}>
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: animationData2
          }}
          height={550}
          width={550}
          // isStopped={this.state.isStopped}
          // isPaused={this.state.isPaused}
        />
        <Typography
          variant="h2"
          style={{
            textAlign: 'center'
          }}
        >
          Welcome to Carrot
        </Typography>
      </Grid>
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
              mt: 2,
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
             
            />

            <TextField
              id="outlined-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              sx={{ marginTop: '30px' }}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            {/* <Typography align="center" sx={{ mb: 2 }}>
              Or
            </Typography> */}
            {/* <TextField required id="outlined-required" label="Phone Number" /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => {
                router.push('/dashboards');
              }}
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
  );
}

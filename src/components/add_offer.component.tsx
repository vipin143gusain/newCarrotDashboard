import { LoginContext } from '@/contexts/login.context';
import { OfferTypes } from '@/models/types/offers';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {
  Button,
  Card, CardActions, CardContent,
  CardHeader,
  CardMedia, Divider, Grid, styled, TextField, Typography
} from '@mui/material';
import { useContext } from 'react';




interface FeedCardProps {
  offerTypes: OfferTypes;
  feed_id: string;
  image: string;
  title: string;
  display_order?: number;
}

const FeedCard = (props: FeedCardProps) => {
  const { offerTypes, image, title, display_order, feed_id } = props;
  const { setUsername } = useContext(LoginContext);

  const ButtonError = styled(Button)(
    ({ theme }) => `
     background: none;
     border:1px solid ${theme.colors.error.main};
     color: ${theme.colors.error.main};

     &:hover {
        background: ${theme.colors.error.dark};
         color: ${theme.palette.error.contrastText};
     }
    `
  );

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader title={offerTypes} />
        <Divider />
        <CardContent>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 160 }} image={image} title={title} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {feed_id}
              </Typography>
              <TextField
                id="outlined-required"
                label="Display Order"
                placeholder="001"
                value={display_order}
                helperText="The order in which this card will be displayed"
                variant="filled"
                style={{ width: '100%', marginTop: '10px' }}
              />
              {/* <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography> */}
            </CardContent>
            <CardActions>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
              >
                {' '}
                <Button
                  startIcon={<ModeEditOutlineTwoToneIcon />}
                  variant="outlined"
                  onClick={() => setUsername('Evan')}
                >
                  Edit
                </Button>
                <ButtonError
                  startIcon={<DeleteTwoToneIcon />}
                  size="medium"
                  variant="contained"
                >
                  Delete
                </ButtonError>
              </Grid>

              {/* <Button size="small">Share</Button>
              <Button size="small">Learn More</Button> */}
            </CardActions>
          </Card>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default FeedCard;

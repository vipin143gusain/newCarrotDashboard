import CircleIcon from '@mui/icons-material/Circle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
 
  styled,
  Typography
} from '@mui/material';
import { indigo, red } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
interface FeedCardProps {
  type: string;
  feed_id: number;
  image: string;
  secondary_image?: string;
  title?: any;
  display_order?: number;
  logo?: string;
  onEditClick?: any;
  onDeleteClick?: any;
  cardInfo?: any;
  description?: any;
  id?: any;
  qc_status_asset?:any;
  defaultValue?:any;
}

const FeedCard = (props: FeedCardProps) => {
  const {
    type,
    image,
    title,
    secondary_image,
    logo,
    onEditClick,
    cardInfo,
    onDeleteClick,
    feed_id,
    description,
    qc_status_asset,
    id,
  } = props;

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

  const getOfferType = (givenType: string) => {
    switch (givenType) {
      case 'single_offer':
        return 'Single Offer';

      case 'single_image':
        return 'Single Image';

      case 'single_video':
        return 'Single Video';

      case 'double_offer':
        return 'Double Offer';

      case 'double_image':
        return 'Double Image';

      case 'DOUBLE_VIDEO_TYPE':
        return 'DOUBLE_OFFER_TYPE';
    }
  };

  const useStyles = makeStyles(() => ({
    title: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      width: '240px',
      textOverflow: 'ellipsis',
      fontSize: '12px !important',
    },
    statusIcon: {
      fontSize: '12px',
      color: 'yellow',
    },
  }));

  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          title={title}
          style={{ color: '#fff' }}
          avatar={<Avatar sx={{ bgcolor: red[500] }} src={logo} />}
          subheader={
            <Typography className={classes.title}>{description}</Typography>
          }

          // subheader={description}
        />
        <Divider />
        <p style={{ padding: ' 0 14px', textTransform: 'capitalize' }}>
          <strong>Status </strong>{' '}
          <CircleIcon
            className={classes.statusIcon}
            style={{
              fontSize: '12px',
              verticalAlign: 'middle',
              color:
                qc_status_asset === 'pending'
                  ? 'yellow'
                  : qc_status_asset === 'approved'
                  ? '#58CA22'
                  : 'red',
              marginRight: '5px',
            }}
          />
          {qc_status_asset}
        </p>
        {type === 'DOUBLE_IMAGE_TYPE' ? (
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
            padding="1px"
          >
            <CardMedia
              sx={{
                height: 160,
                width: '47%',
                borderWidth: '1px',
                borderRadius: '5px',
              }}
              image={image}
              title={title}
            />

            <CardMedia
              sx={{
                height: 160,
                width: '47%',
                borderWidth: '1px',
                borderRadius: '5px',
              }}
              image={secondary_image}
              title={title}
            />
          </Grid>
        ) : (
          <CardMedia
            sx={{ height: 160, padding: '1px' }}
            image={image}
            title={title}
          />
        )}

        <CardContent>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {type && <LocalOfferIcon />}
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ ml: 1 }}
            >
              {getOfferType(type)}
            </Typography>
          </Grid>
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: indigo[900] }}>{feed_id} </Avatar>
            <Grid direction="row" justifyContent="flex-end" alignItems="center">
              <Button
                startIcon={<ModeEditOutlineTwoToneIcon />}
                variant="outlined"
                onClick={() => onEditClick(cardInfo)}
              >
                {qc_status_asset === 'pending' ? 'View' : 'Edit'}
              </Button>
              <ButtonError
                sx={{ ml: 2 }}
                startIcon={<DeleteTwoToneIcon />}
                size="medium"
                variant="contained"
                onClick={() => onDeleteClick(id)}
                disabled={qc_status_asset === 'pending' ? true : false}
              >
                Delete
              </ButtonError>
            </Grid>
          </Grid>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default FeedCard;
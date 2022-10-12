import { BrandTabTypes } from '@/models/types/brand_tabtype';
import CircleIcon from '@mui/icons-material/Circle';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import ModeEditOutlineTwoToneIcon from '@mui/icons-material/ModeEditOutlineTwoTone';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Link
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import { indigo, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
// import { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

// interface ExpandMoreProps extends IconButtonProps {
//   expand: boolean;
// }

interface CommonCardProps {
  cardType: BrandTabTypes;
  logo?: string;
  name: string;
  tagline?: string;
  order?: number;
  image?: string;
  url?: string;
  onEditClick?: any;
  onDeleteClick?: any;
  value?: number;
  price?: number;
  attribute?: string;
  setProdDefault?: any;
  cardDetail?: any;
  prodDefault?: any;
  qc_status_asset?: string;
}

const ButtonError = styled(Button)(
  ({ theme }) => `
   background: none;
   border: 1px solid ${theme.colors.error.main};
   color: ${theme.colors.error.main};

   &:hover {
      background: ${theme.colors.error.dark};
       color: ${theme.palette.error.contrastText};
   }
  `
);
const useStyles = makeStyles(() => ({
  subHeader: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    width: '240px',
    textOverflow: 'ellipsis'
  }
}));

const CommonCard = (props: CommonCardProps) => {
  const {
    cardType,
    logo,
    name,
    tagline,
    order,
    onEditClick,
    onDeleteClick,
    image,
    url,
    value,
    price,
    attribute,
    cardDetail,
    setProdDefault,
    prodDefault,
    qc_status_asset
  } = props;

  const classes = useStyles();

  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }} src={logo} />}
          sx={{ color: '#fff' }}
          title={name}
          subheader={
            <Link target="_blank" href={url}>
              <Typography className={classes.subHeader}>{url}</Typography>
            </Link>
          }
        />
        <p style={{ padding: ' 0 14px', textTransform: 'capitalize' }}>
          <strong>Status </strong>{' '}
          <CircleIcon
            // className={classes.statusIcon}
            style={{
              fontSize: '12px',
              verticalAlign: 'middle',
              color:
                qc_status_asset === 'pending'
                  ? 'yellow'
                  : qc_status_asset === 'approved'
                  ? '#58CA22'
                  : 'red',
              marginRight: '5px'
            }}
          />
          {qc_status_asset}
        </p>
        <CardMedia
          sx={{
            height: 0,
            paddingTop: '56.25%' // 16:9
          }}
          image={image}
          title={name}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.subHeader}
          >
            {tagline}
          </Typography>
          {cardType === 'WALLET_PRODUCT' ? (
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography fontSize={14} color="text.secondary">
                  Value
                </Typography>
                <Typography fontSize={18} fontWeight="bold" color="#fff">
                  {value}
                </Typography>
              </Box>
              <Box>
                <Typography fontSize={14} color="text.secondary">
                  Attribute
                </Typography>
                <Typography fontSize={18} fontWeight="bold" color="#fff">
                  {attribute}
                </Typography>
              </Box>
              <Box
              // style={{
              //   height: '100%',
              //   width: '33%',
              //   alignItems: 'flex-end',
              //   display: 'flex',
              //   flexDirection: 'column'
              // }}
              >
                <Typography fontSize={14} color="text.secondary">
                  Price
                </Typography>
                <Typography fontSize={18} fontWeight="bold" color="#fff">
                  ₹{price}
                </Typography>
              </Box>
            </Grid>
          ) : null}
        </CardContent>
        <CardActions>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Avatar sx={{ bgcolor: indigo[900], padding: '16px' }}>
              {order}{' '}
            </Avatar>
            <Grid direction="row" justifyContent="flex-end" alignItems="center">
              <Button
                startIcon={<ModeEditOutlineTwoToneIcon />}
                variant="outlined"
                onClick={() => {
                  // console.log(cardDetail)
                  // setProdDefault({
                  //   ...prodDefault,
                  //   defaultValues: cardDetail
                  // });

                  onEditClick(cardDetail);
                }}
              >
                {qc_status_asset === 'pending' ? 'View' : 'Edit'}
              </Button>
              <ButtonError
                sx={{ ml: 2 }}
                startIcon={<DeleteTwoToneIcon />}
                size="medium"
                variant="contained"
                onClick={onDeleteClick}
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

export default CommonCard;

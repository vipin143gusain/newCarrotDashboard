import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  MenuItem, Rating,
  styled,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import { useEffect } from 'react';

import { AppState } from '@/store';
import { categoryList, channelList, subCategoryList } from '@/store/slices/feed';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewIcon from '@mui/icons-material/GridView';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 250
    }
  }
};





const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(5)};
      height: ${theme.spacing(5)};
`
);

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#57CA22'
  },
  '& .MuiRating-iconHover': {
    color: '#57CA22'
  }
});

function RecentActivity() {
  const theme = useTheme();
  const _theBrand = useSelector<AppState>((state) => state.brand.brand);
  
  const [_priceRating, setPriceRating] = useState(0); // initial rating value
  const [_brandRating, setBrandRating] = useState(0); // initial rating value
  const categoryListData = useSelector(categoryList);
  const subCategoryListData = useSelector(subCategoryList);
  const channelListData = useSelector(channelList);

  const [personName, setPersonName] = React.useState<string[]>([]);
  const [market, setMarket] = useState({
    category_ids: [],
    gender: '',
    tag_ids: [],
    theme_ids: [],
    sub_category_ids: [],
    channels:[]
  });

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value }
    } = event;
    console.log(value[0]);
    setPersonName(
      // On autofill we get a stringified value.

      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(()=>{

    market.channels= _theBrand?.channels&&_theBrand?.channels.length>0?_theBrand?.channels.map((el,index)=>{ return {id:(index+1),name:el} }):[],
    market.category_ids=_theBrand?.categories?_theBrand?.categories:[]
    market.sub_category_ids=_theBrand?.sub_categories?_theBrand?.sub_categories:[],
    setMarket({
      ...market
    })
if(_theBrand.brand_rating!==0)
{
  setBrandRating(_theBrand.brand_rating)
}

  },[_theBrand])

  return (
    <Card>
      <CardHeader title="Admin Rating Block" />
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <ReviewsIcon />
        </AvatarPrimary>

        <Box pl={2} flex={1}>
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(18)}`,
              fontWeight: 'bold',
              color: 'white'
            }}
          >
            Price Rating
          </Typography>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}
          >
            <StyledRating
              name="customized-color"
              defaultValue={2}
              readOnly
              value={_theBrand.price_rating}
              onChange={(event, newValue) => {
                setPriceRating(newValue);
                console.log(event)
              }}
              getLabelText={(value: number) =>
                `${value} Heart${value !== 1 ? 's' : ''}`
              }
              precision={0.5}
              size="large"
              icon={<CurrencyRupeeIcon fontSize="inherit" />}
              emptyIcon={<CurrencyRupeeIcon fontSize="inherit" />}
            />
           
          </Box>

          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(18)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '10px'
            }}
          >
            Brand Rating
          </Typography>
          <Tooltip title="Brand Rating for this brand" placement="bottom">
            <>
           
            <Rating
              name="simple-controlled"
              readOnly
              value={_theBrand.brand_rating}
              size="large"
              onChange={(event, newValue) => {
                setBrandRating(newValue);
                console.log(event)
              }}

            />
            
            </>
          </Tooltip>
        </Box>
      </Box>
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <GridViewIcon />
        </AvatarPrimary>
        <Box pl={2} flex={1}>
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: '10px'
              
            }}
          >
            Categories
          </Typography>
          <FormControl style={{ maxWidth: 240, minWidth: 240 }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              readOnly
              value={market.category_ids}
              style={{ width: '100%' }}
              onChange={handleChange}
              // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value.name} label={value.name} />
                    ))}
                  </div>
                );
              }}
              MenuProps={MenuProps}
            >
              {categoryListData.map((option) => (
                    <MenuItem key={option.id} value={option}>
                      {option?.name ? option.name : option}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            Sub Categories
          </Typography>
          <FormControl style={{ maxWidth: 240, minWidth: 240 }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={market.sub_category_ids}
              style={{ width: '100%' }}
              onChange={handleChange}
              // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value.name} label={value.name} />
                    ))}
                  </div>
                );
              }}
              MenuProps={MenuProps}
            >
              {
              subCategoryListData.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option?.name ? option.name : option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            Channel
          </Typography>
          <FormControl style={{ maxWidth: 240, minWidth: 240 }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={market.channels}
              style={{ width: '100%' }}
              onChange={handleChange}
              // input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => {
                return (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value.name} label={value.name} />
                    ))}
                  </div>
                );
              }}
              MenuProps={MenuProps}
            >
              {
              channelListData.map((option) => (
                <MenuItem key={option.id} value={option}>
                  {option?.name ? option.name : option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Divider />
      <Box px={1} py={2} display="flex" alignItems="flex-start">
        <AvatarPrimary>
          <StarTwoToneIcon />
        </AvatarPrimary>

        
          
        <Box pl={2} flex={1}>
           <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '10px',
              marginBottom: '10px'
            }}
          >
            Brand Cashback
          </Typography>
          <TextField
          disabled
            id="outlined-search"
            // label="Brand Cashback"
            fullWidth
            value={_theBrand.brand_cashback}
            placeholder="eg. 10% Off"
          />
          <Divider />
          <Divider />

           <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(17)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '20px',
              marginBottom: '10px'
            }}
          >
           Validity of Cashback
          </Typography>
           <Divider />
          
          <TextField
          disabled
            id="outlined-search"
            // label="validity_of_cashback"
            fullWidth
            value={_theBrand.validity_of_cashback}
            placeholder="eg. 10% Off"
          />
          <Divider />
           <Divider />
          <Typography
            sx={{
              fontSize: `${theme.typography.pxToRem(18)}`,
              fontWeight: 'bold',
              color: 'white',
              marginTop: '10px'
            }}
          >
            
            In-app Visibility
            <Switch readOnly checked={_theBrand.visiblity===1?true:false} color="success" />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;

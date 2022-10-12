import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  FormControl,
  MenuItem,
  OutlinedInput,
  Rating,
  styled,
  Switch,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';

import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import GridViewIcon from '@mui/icons-material/GridView';
import ReviewsIcon from '@mui/icons-material/Reviews';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';
import Chip from '@mui/material/Chip';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useState } from 'react';

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

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder'
];



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
  const [_priceRating, setPriceRating] = useState(0); // initial rating value
  const [_brandRating, setBrandRating] = useState(0); // initial rating value

  const [personName, setPersonName] = React.useState<string[]>([]);

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
              value={_priceRating}
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
              value={_brandRating}
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
              value={personName}
              style={{ width: '100%' }}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 0.5,
                    overflowX: 'scroll'
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
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
              value={personName}
              style={{ width: '100%' }}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: 0.5,
                    overflowX: 'scroll'
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {names.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
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
          <TextField
            id="outlined-search"
            label="Brand Cashback"
            fullWidth
            placeholder="eg. 10% Off"
          />
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
            <Switch defaultChecked color="success" />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default RecentActivity;

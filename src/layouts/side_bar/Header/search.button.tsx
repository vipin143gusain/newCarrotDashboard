import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import {
  Avatar, Box, Dialog,
  DialogContent,
  DialogTitle, Divider, Hidden, IconButton,
  InputAdornment, Link, List,
  ListItem,
  ListItemAvatar, Slide, TextField,
  Theme,
  Tooltip,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import { ChangeEvent, forwardRef, ReactElement, Ref, useCallback, useState } from 'react';

import { _serveAPI } from '@/api/service';
import { AppDispatch } from '@/store';
import { getOffer } from '@/store/slices/add_offer';
import { UPDATE_BRAND_SEARCH } from '@/store/slices/brand';
import { getFeedCards } from '@/store/slices/feed';
import { search, TOGGLE_RESULTS, updateWalletId } from '@/store/slices/search';
import { getCategory } from '@/store/slices/wallet_category';
import { getProduct } from '@/store/slices/wallet_product';
import { throttle } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';


const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {
  const dispatch = useDispatch<AppDispatch>();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const searchData = useSelector(search);
  const {currentTab,walletId} = useSelector(search);
  const openSearchResults = useSelector(search).isResultOpen;


  const apiCall = async(val)=>{
      _serveAPI({
        endPoint:"api/admin/wallet/search",
        method:"POST",
        data:{
          name:val
        }
      }).then(res=>{
        if(res.status==="success"){
          setSearchResult(res.data.data)
          return res.data.data
        }else{
          setSearchResult([])
          return []
        }
      })
    
  }

  const selectSearchResult = (searchVal)=>{
    if(currentTab==="about"){
      dispatch(UPDATE_BRAND_SEARCH(searchVal));
    }else if(currentTab==="walletproducts"){
     dispatch(getProduct({walletId:searchVal.id,qc_status:""}));
      dispatch(updateWalletId(searchVal.id));
    }else if(currentTab==="walletcategories"){
      dispatch(getCategory({walletId:searchVal.id,qc_status:""}));
       dispatch(updateWalletId(searchVal.id));
    }else if(currentTab==="walletcategories"){
      dispatch(getCategory({walletId:searchVal.id,qc_status:""}));
       dispatch(updateWalletId(searchVal.id));
    }else if(currentTab==="feed"){
      dispatch(getFeedCards({walletId:searchVal.id,qc_status:""}));
       dispatch(updateWalletId(searchVal.id));
    }else if(currentTab==="addOffer"){
      dispatch(getOffer({walletId:searchVal.id,qc_status:""}));
       dispatch(updateWalletId(searchVal.id));

    
  }else{null}

  }


  const searchNow = useCallback(
		throttle(nextValue => apiCall(nextValue), 1000),
		[currentTab],
	);
  
  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);

    if (event.target.value&&event.target.value.length>=3) {

      searchNow(event.target.value)

      if (!openSearchResults) {
        dispatch(TOGGLE_RESULTS(true)); 

      }
    } else {
      dispatch(TOGGLE_RESULTS(false));
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    dispatch(TOGGLE_RESULTS(false));
    setSearchValue("")
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(TOGGLE_RESULTS(false));
    setSearchValue("")
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              {/* <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link> */}
            </Box>
            <Divider sx={{ my: 1 }} />
            <List disablePadding>
              {
                searchResult.map((searchItem)=>(
                  <>
              <ListItem button key={searchItem.id}
              onClick={()=>{
                setSearchValue(searchItem.name)
                selectSearchResult(searchItem);
                handleClose()
              }}
               >
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                      src={
                        searchItem?.logo_file_key
                    ? `https://d3nk16lz1ssvqj.cloudfront.net/${searchItem?.logo_file_key}`
                    :
                  null
                      }
                    >
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                     {searchItem.name}
                    </Link>
                  </Box>
                  {/* <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    This page contains all the necessary information for
                    managing all hospital staff.
                  </Typography> */}
                </Box>
                {/* <ChevronRightTwoToneIcon /> */}
              </ListItem>
              <Divider sx={{ my: 1 }} component="li" />
              </>

                ) )
              }
              {/* <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Example Projects Application
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    This is yet another search result pointing to a app page.
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem>
              <Divider sx={{ my: 1 }} component="li" />
              <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Search Results Page
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    Choose if you would like to show or not this typography
                    section here...
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem> */}
            </List>
            {/* <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button color="primary">View all search results</Button>
            </Box> */}
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
